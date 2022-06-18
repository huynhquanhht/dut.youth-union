'use strict';
const activityRepo = require('../repositories/activity');
const userRepo = require('../repositories/user');
const studentRepo = require('../repositories/student');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelizeUtils = require('../utils/sequelize');
const moment = require('moment');
const models = require('../models');
const timeUtils = require('../utils/time');
const registerJoinRepo = require('../repositories/register_join');

const getStudentByUserId = async (currentUserId) => {
  let options = {};
  options.include = [{ model: models.student }];
  options.where = { id: currentUserId };
  const user = await userRepo.getOne(options);
  return user.student;
};

const get = async (option) => {
  if (option === 'Common') {
    return await getCommonActivity();
  }
  if (option === 'This week') {
    return await getActivityInThisWeek();
  }
  if (option === 'This month') {
    return await getActivityInThisMonth();
  }
  if (option === 'Upcomming') {
    return await getUpcomingActivity();
  }
  if (option === 'Occurring') {
    return await getOccurringActivity();
  }
  if (option === 'Your faculty') {
    return await getActivityOfYourFaculty();
  }
};

const getCommonActivity = async () => {
  let options = {};
  options.include = [{
    model: models.student,
    required: false,
  }];
  let activityList = await activityRepo.getAllAndCount(options);
  activityList = sequelizeUtils.convertJsonToObject(activityList);
  activityList.rows.forEach((item) => {
    item.begin_at = timeUtils.formatTime(item.begin_at);
    item.begin_at.replace(' ', '\n');
    item.end_at = timeUtils.formatTime(item.end_at);
    item.end_at.replace(' ', '\n');
    item.startTimeText = timeUtils.formatTimeText(item.begin_at);
    item.endTimeText = timeUtils.formatTimeText(item.end_at);
  });
  return activityList;
};

const getActivityInThisWeek = () => {

};

const getActivityInThisMonth = () => {

};

const getUpcomingActivity = () => {

};

const getOccurringActivity = () => {

};

const getActivityOfYourFaculty = () => {

}

const getByStudent = async (query, currentUserId) => {
  let options = {};
  let student = await getStudentByUserId(currentUserId);
  options.include = [{
    model: models.activity,
    include: [{
      model: models.student,
    }],
    required: false,
  }];
  options.where = { id: student.id };
  for (let attribute in query) {
    if (query.hasOwnProperty(attribute) && query[attribute]) {
      options.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
    }
  }
  student = await studentRepo.getOne(options);
  student = sequelizeUtils.convertJsonToObject(student);
  console.log('student - ', student);
  student.activities.forEach((item) => {
    item.begin_at = timeUtils.formatTime(item.begin_at);
    item.begin_at.replace(' ', '\n');
    item.end_at = timeUtils.formatTime(item.end_at);
    item.end_at.replace(' ', '\n');
    item.startTimeText = timeUtils.formatTimeText(item.begin_at);
    item.endTimeText = timeUtils.formatTimeText(item.end_at);
  });
  return student.activities;
};

const getPointListOfCurrentStudent = async (currentUserId) => {
  let options = {};
  // Get current student by user id
  let student = await getStudentByUserId(currentUserId);
  student = JSON.parse(JSON.stringify(student));
  const activityPoints = [];
  // Get school year
  let schoolYears = await activityRepo.getAll({
    attributes: ['school_year'],
  });
  schoolYears = JSON.parse(JSON.stringify(schoolYears));
  // Filter school year
  const registeredYear = new Date(student.created_at).getFullYear();
  const startSchoolYear = registeredYear + ' - ' + (registeredYear + 1)
  const schoolYearSet = new Set(schoolYears.filter(item => startSchoolYear <= item.school_year).map(item => item.school_year));
  console.log('schoolYearSet - ', schoolYearSet);
  for (let item of schoolYearSet) {
    let totalPoint = 0;
    options.include = [{
      model: models.activity,
      where: { school_year: item },
      include: [{
        model: models.student,
        required: false,
      }],
      required: false,
    }];
    options.where = { id: student.id };
    student = await studentRepo.getOne(options);
    student = sequelizeUtils.convertJsonToObject(student);
    // Calc total of activity point,
    student.activities.forEach((activity) => {
      if (activity.register_join.attended_at) {
        activity.register_join.accumulated = activity.point;
        totalPoint += activity.point;
      }
    });
    activityPoints.push({
      schoolYear: item,
      activities: student.activities,
      totalPoint: totalPoint,
    })
  }
  return activityPoints;
};

const getAll = async (page, size) => {
  let activityList;
  let options;
  if (!page || !size) {
    activityList = await activityRepo.getAllAndCount({});
  } else {
    const offset = (page - 1) * size;
    options = { limit: +size, offset: offset };
    activityList = await activityRepo.getAllAndCount(options);
  }
  activityList = sequelizeUtils.convertJsonToObject(activityList)
  activityList.rows.forEach((item) => {
    item.start_time = moment(item.start_time).format('HH:MM DD/MM/YYYY');
    item.start_time.replace(' ', '\n')
    item.end_time = moment(item.end_time).format('HH:MM DD/MM/YYYY');
    item.end_time.replace(' ', '\n');
  })
  return activityList;
};

const getById = async (activityId, userId) => {
  let options = {};
  options.where = { id: activityId };
  options.include = [{
    model: models.student,
    require: false,
  }];
  // Get activity
  let activity = await activityRepo.getById(options);
  activity = JSON.parse(JSON.stringify(activity));
  activity.attendanceQuantity = await countAttendanceQuantity(activityId);
  activity.iscurrentUserRegistered = await isCurrentUserRegistered(activityId, userId);
  activity.isCurrentUserAttended = await isCurrentUserAttended(activityId, userId);
  return activity;
};

const countAttendanceQuantity = async (activityId) => {
  let options = {
    where: {
      id: activityId,
      attended_at: null,
    }
  };
  return await registerJoinRepo.count(options);
};

const isCurrentUserRegistered = async (activityId, userId) => {
  const student = await studentRepo.getOne({ where: {user_id: userId}});
  let option = {
    where: {
      student_id: student.id,
      activity_id: activityId,
    }
  };
  let registerJoin = await registerJoinRepo.getOne(option);
  return registerJoin ? true : false;
};

const isCurrentUserAttended = async (activityId, userId) => {
  const student = await studentRepo.getOne({ where: {user_id: userId}});
  let option = {
    where: {
      student_id: student.id,
      activity_id: activityId,
      attended_at: {
        [Op.ne]: null
      }
    }
  };
  let registerJoin = await registerJoinRepo.getOne(option);
  console.log('resterjoin - ', registerJoin);
  return registerJoin ? true : false;
};

const create = async (newActivity, currentUserId) => {
  const data = {
    name: newActivity.activityName,
    organization_unit: newActivity.organizationUnit,
    begin_at: newActivity.beginAt,
    end_at: newActivity.endAt,
    begin_registration_at: newActivity.beginRegistrationAt,
    end_registration_at: newActivity.endRegistrationAt,
    place: newActivity.place,
    participant_quantity: newActivity.participantQuantity,
    point: newActivity.point,
    content: newActivity.content,
    cover_url: newActivity.coverUrl,
    created_by: currentUserId,
  }
  return await activityRepo.create(data);
};

const update = async (activityId, newActivity) => {
  let condition = {};
  condition.where = { id: activityId };
  const data = {
    name: newActivity.activityName,
    organization_unit: newActivity.organizationUnit,
    begin_at: newActivity.beginAt,
    end_at: newActivity.endAt,
    begin_registration_at: newActivity.beginRegistrationAt,
    end_registration_at: newActivity.endRegistrationAt,
    place: newActivity.place,
    participant_quantity: newActivity.participantQuantity,
    point: newActivity.point,
    content: newActivity.content,
    cover_url: newActivity.coverUrl,
  }
  return await activityRepo.updateById(data, condition);
};

const deleteByIds = async (activityIds) => {
  const options = { where: { id: activityIds } };
  const deletionResult = await activityRepo.deleteByIds(options);
  return deletionResult;
};

const openRegistration = async (activityId) => {
  const condition = { where: { id: activityId }};
  console.log('condition - ', condition);
  const data = {
    begin_registration_at: timeUtils.getCurrentTime(),
  };
  return await activityRepo.updateById(data, condition);
};

const closeRegistration = async (activityId) => {
  const condition = { where: { id: activityId }};
  const data = {
    end_registration_at: timeUtils.getCurrentTime(),
  };
  return await activityRepo.updateById(data, condition);
};

const register = async (activityId, userId) => {
  let option = {
    where: {
      user_id: 1432,
    }
  };
  const student = await studentRepo.getOne(option);
  const newRegisterJoin = {
    student_id: student.id,
    activity_id: activityId,
    registered_at: timeUtils.getCurrentTime(),
  }
  console.log('newRegisterJoin - ', newRegisterJoin);
  return await registerJoinRepo.create(newRegisterJoin);
}

const attend = async (activityId, userId) => {
  const student = await studentRepo.get({ where: {user_id: userId}});
  let option = {
    where: {
      student_id: student.id,
      activity_id: activityId,
    }
  };
  const newAttendance = {
    attended_at: timeUtils.getCurrentTime(),
  }
  return await registerJoinRepo.update(option, newAttendance);
}

module.exports = {
  get,
  getAll,
  getByStudent,
  getById,
  create,
  update,
  deleteByIds,
  openRegistration,
  closeRegistration,
  register,
  attend,
  getPointListOfCurrentStudent,
};
