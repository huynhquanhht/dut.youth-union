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
  if (option === 'common') {
    console.log('b');
    return await getCommonActivity();
  }
  if (option === 'this-week') {
    return await getActivityInThisWeek();
  }
  if (option === 'upcoming') {
    return await getUpcomingActivity();
  }
  if (option === 'occurring') {
    return await getOccurringActivity();
  }
  if (option === 'end') {
    return await getEndActivity();
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
  let newActivityList = [];
  activityList.rows = activityList.rows.forEach((item) => {
    console.log('a');
    if (Date.parse(item.end_at) >= Date.parse(timeUtils.getCurrentTime())) {
        item.begin_at = timeUtils.formatTime(item.begin_at);
      item.begin_at.replace(' ', '\n');
      item.end_at = timeUtils.formatTime(item.end_at);
      item.end_at.replace(' ', '\n');
      item.startTimeText = timeUtils.formatTimeText(item.begin_at);
      item.endTimeText = timeUtils.formatTimeText(item.end_at);
      newActivityList.push(item);
  }});
  activityList.rows = newActivityList;
  return activityList;
};

const getActivityInThisWeek = async () => {
  var curr = new Date;
  var first = curr.getDate() - curr.getDay() + 1;
  var last = first + 6;
  var firstDay = new Date(curr.setDate(first));
  firstDay.setUTCHours(0);
  firstDay.setUTCMinutes(0);
  firstDay.setUTCSeconds(0);
  var lastDay = new Date(curr.setDate(last));
  lastDay.setUTCHours(23);
  lastDay.setUTCMinutes(59);
  lastDay.setUTCSeconds(59);
  let options = {};
  options.include = [{
    model: models.student,
    required: false,
  }];
  let activityList = await activityRepo.getAllAndCount(options);
  activityList = sequelizeUtils.convertJsonToObject(activityList);
  let newActivityList = [];
  activityList.rows = activityList.rows.forEach((item) => {
    console.log('a');
    if (Date.parse(item.end_at) > Date.parse(timeUtils.getCurrentTime())) {
      if (Date.parse(item.begin_at) >= Date.parse(firstDay) &&
          Date.parse(item.end_at) <= Date.parse(lastDay)
      )
      item.begin_at = timeUtils.formatTime(item.begin_at);
      item.begin_at.replace(' ', '\n');
      item.end_at = timeUtils.formatTime(item.end_at);
      item.end_at.replace(' ', '\n');
      item.startTimeText = timeUtils.formatTimeText(item.begin_at);
      item.endTimeText = timeUtils.formatTimeText(item.end_at);
      newActivityList.push(item);
    }
  });
  activityList.rows = newActivityList;
  return activityList;
};

const getUpcomingActivity = async () => {
  var curr = new Date;
  var first = curr.getDate() - curr.getDay() + 1;
  var last = first + 6;
  var firstDay = new Date(curr.setDate(first));
  firstDay.setUTCHours(0);
  firstDay.setUTCMinutes(0);
  firstDay.setUTCSeconds(0);
  var lastDay = new Date(curr.setDate(last));
  lastDay.setUTCHours(23);
  lastDay.setUTCMinutes(59);
  lastDay.setUTCSeconds(59);
  let options = {};
  options.include = [{
    model: models.student,
    required: false,
  }];
  let activityList = await activityRepo.getAllAndCount(options);
  activityList = sequelizeUtils.convertJsonToObject(activityList);
  let newActivityList = [];
  activityList.rows = activityList.rows.forEach((item) => {
    if (Date.parse(item.begin_at) > Date.parse(timeUtils.getCurrentTime())) {
      item.begin_at = timeUtils.formatTime(item.begin_at);
      item.begin_at.replace(' ', '\n');
      item.end_at = timeUtils.formatTime(item.end_at);
      item.end_at.replace(' ', '\n');
      item.startTimeText = timeUtils.formatTimeText(item.begin_at);
      item.endTimeText = timeUtils.formatTimeText(item.end_at);
      newActivityList.push(item);
  }});
  activityList.rows = newActivityList;
  return activityList;
};

const getOccurringActivity = async () => {
  var curr = new Date;
  var first = curr.getDate() - curr.getDay() + 1;
  var last = first + 6;
  var firstDay = new Date(curr.setDate(first));
  firstDay.setUTCHours(0);
  firstDay.setUTCMinutes(0);
  firstDay.setUTCSeconds(0);
  var lastDay = new Date(curr.setDate(last));
  lastDay.setUTCHours(23);
  lastDay.setUTCMinutes(59);
  lastDay.setUTCSeconds(59);
  let options = {};
  options.include = [{
    model: models.student,
    required: false,
  }];
  let activityList = await activityRepo.getAllAndCount(options);
  activityList = sequelizeUtils.convertJsonToObject(activityList);
  let newActivityList = [];
  activityList.rows = activityList.rows.forEach((item) => {
    console.log('a');
    if (Date.parse(item.begin_at) <= Date.parse(timeUtils.getCurrentTime()) &&
        Date.parse(item.end_at) >= Date.parse(timeUtils.getCurrentTime())
    ) {
      item.begin_at = timeUtils.formatTime(item.begin_at);
      item.begin_at.replace(' ', '\n');
      item.end_at = timeUtils.formatTime(item.end_at);
      item.end_at.replace(' ', '\n');
      item.startTimeText = timeUtils.formatTimeText(item.begin_at);
      item.endTimeText = timeUtils.formatTimeText(item.end_at);
      newActivityList.push(item);
    }});
  activityList.rows = newActivityList;
  return activityList;
};

const getEndActivity = async () => {
  var curr = new Date;
  var first = curr.getDate() - curr.getDay() + 1;
  var last = first + 6;
  var firstDay = new Date(curr.setDate(first));
  firstDay.setUTCHours(0);
  firstDay.setUTCMinutes(0);
  firstDay.setUTCSeconds(0);
  var lastDay = new Date(curr.setDate(last));
  lastDay.setUTCHours(23);
  lastDay.setUTCMinutes(59);
  lastDay.setUTCSeconds(59);
  let options = {};
  options.include = [{
    model: models.student,
    required: false,
  }];
  let activityList = await activityRepo.getAllAndCount(options);
  activityList = sequelizeUtils.convertJsonToObject(activityList);
  let newActivityList = [];
  activityList.rows = activityList.rows.forEach((item) => {
    if (Date.parse(item.end_at) < Date.parse(timeUtils.getCurrentTime())
    ) {
      item.begin_at = timeUtils.formatTime(item.begin_at);
      item.begin_at.replace(' ', '\n');
      item.end_at = timeUtils.formatTime(item.end_at);
      item.end_at.replace(' ', '\n');
      item.startTimeText = timeUtils.formatTimeText(item.begin_at);
      item.endTimeText = timeUtils.formatTimeText(item.end_at);
      newActivityList.push(item);
    }});
  activityList.rows = newActivityList;
  return activityList;
};

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
  let newActivityList = [];
  student.activities.forEach((item) => {
    if (Date.parse(item.end_at) > Date.parse(timeUtils.getCurrentTime())) {
      item.begin_at = timeUtils.formatTime(item.begin_at);
      item.begin_at.replace(' ', '\n');
      item.end_at = timeUtils.formatTime(item.end_at);
      item.end_at.replace(' ', '\n');
      item.startTimeText = timeUtils.formatTimeText(item.begin_at);
      item.endTimeText = timeUtils.formatTimeText(item.end_at);
      newActivityList.push(item);
    }

  });
  student.activities = newActivityList;
  return student.activities;
};

const getPointListOfCurrentStudent = async (currentUserId, schoolYear) => {
  let options = {};
  let schoolYears;
  // Get current student by user id
  let student = await getStudentByUserId(currentUserId);
  student = JSON.parse(JSON.stringify(student));
  const activityPoints = [];

  options.include = [{
    model: models.activity,
    where: { school_year: schoolYear },
    include: [{
      model: models.student,
      required: false,
    }],
    required: false,
  }];
  options.where = { id: student.id };
  student = await studentRepo.getOne(options);
  student = sequelizeUtils.convertJsonToObject(student);
  let totalPoint = 0;
  for (let i = 0; i < student.activities.length; i++) {
    if (student.activities[i].register_join.attended_at) {
      totalPoint += student.activities[i].point;
    }
  }
  student.totalPoint = totalPoint;
  return student;
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
  if (!student) {
    return false;
  }
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
  if (!student) {
    return false;
  }
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
    school_year: '2021 - 2022'
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
  return await registerJoinRepo.create(newRegisterJoin);
}

const attend = async (activityId, userId) => {
  const student = await studentRepo.getOne({ where: {user_id: userId}});
  let option = {
    where: {
      student_id: student.id,
      activity_id: +activityId,
    }
  };
  const newAttendance = {
    attended_at: timeUtils.getCurrentTime(),
  }
  return await registerJoinRepo.update(option, newAttendance);
};

const getRegisteredList = async (activityId) => {
  let option = {
    include: [{
      model: models.student,
      include: [{
        model: models.activityClass,
        include: [{
          model: models.faculty,
        }]
      }]
    }],
    where: {
      id: activityId
    }
  };
  return await activityRepo.getById(option);
};

const addParticipant = async (activityId, studentId) => {
  const newRegisterJoin = {
    activity_id: activityId,
    student_id: studentId,
    registered_at: timeUtils.getCurrentTime(),
  };
  return await registerJoinRepo.create(newRegisterJoin);
};

const deleteParticipants = async (registrationIds) => {
  let transaction;
  try {
    transaction = await models.sequelizeConfig.transaction();
    const options = {
      where: {
        id: registrationIds
      },
      force: true
    };
    const deletionResult = await registerJoinRepo.deleteByIds(options);
    if (deletionResult === registrationIds.length) {
      await transaction.commit();
      return deletionResult;
    } else {
      await transaction.rollback();
      return null;
    }
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    return null;
  }
}

const attendParticipants = async (registrationIds) => {
  const newUpdate = { attended_at: timeUtils.getCurrentTime()};
  const option = {
    where: {
      id: registrationIds,
    }
  };
  return await registerJoinRepo.update(option, newUpdate);
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
  getRegisteredList,
  addParticipant,
  deleteParticipants,
  attendParticipants
};
