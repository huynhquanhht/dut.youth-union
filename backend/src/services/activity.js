'use strict';
const activityRepo = require('../repositories/activity');
const userRepo = require('../repositories/user');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelizeUtils = require('../utils/sequelize');
const moment = require('moment');
const models = require('../models');
const timeUtils = require('../utils/time');

const getStudentByUserId = async (currentUserId) => {
  let options = {};
  options.include = [{ model: models.student }];
  options.where = { id: currentUserId };
  const user = await userRepo.getOne(options);
  return user.student;
};

const get = async (query) => {
  let options = {};
  // options.limit = query.size ? +query.size : 10;
  // options.offset = query.page ? (query.page - 1) * query.size : 1;
  options.include = [{
    model: models.student,
    required: false,
  }];
  delete query.page;
  delete query.size;
  for (let attribute in query) {
    if (query.hasOwnProperty(attribute) && query[attribute]) {
      options.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
    }
  }
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

const getByStudent = async (query, currentUserId) => {
  let options = {};
  // options.limit = query.size ? +query.size : 10;
  // options.offset = query.page ? (query.page - 1) * query.size : 1;
  const student = await getStudentByUserId(currentUserId);
  options.include = [{
    model: models.student,
    where: { id: student.id },
    required: false,
  }];
  delete query.page;
  delete query.size;
  for (let attribute in query) {
    if (query.hasOwnProperty(attribute) && query[attribute]) {
      options.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
    }
  }
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

const getAll = async (page, size) => {
  let activityList;
  let options;
  if (!page || !size) {
    activityList = await activityRepo.getAll({});
  } else {
    const offset = (page - 1) * size;
    options = { limit: +size, offset: offset };
    activityList = await activityRepo.getAll(options);
  }
  options = { where: { deleted_at: null } };
  const quantity = await activityRepo.getQuantity(options);
  activityList = sequelizeUtils.convertJsonToObject(activityList)
  activityList.forEach((item) => {
    item.start_time = moment(item.start_time).format('HH:MM DD/MM/YYYY');
    item.start_time.replace(' ', '\n')
    item.end_time = moment(item.end_time).format('HH:MM DD/MM/YYYY');
    item.end_time.replace(' ', '\n');
  })
  return {
    data: sequelizeUtils.convertJsonToObject(activityList),
    quantity: quantity,
  };
};

const getById = async (activityId) => {
  let options = {};
  options.where = { id: activityId };
  return await activityRepo.getById(options);
}

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

module.exports = {
  get,
  getAll,
  getByStudent,
  getById,
  create,
  update,
  deleteByIds,
};
