'use strict'
const {Op} = require("sequelize");
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');
const unionTextbookRepo = require("../repositories/union_textbook");
const studentRepo = require("../repositories/student");
const timeUtils = require('../utils/time');
const userRepo = require('../repositories/user');
const roleUtils = require('../utils/role');
const commonService = require('./common');

const get = async (currentUserId, query) => {
  let userRole = await commonService.getUserAndRole(currentUserId);
  let option = {};
  if (userRole.roles[0].name === roleUtils.CLASS_SECRETARY) {
    option.include = [{
      model: models.student,
      where: { deleted_at: null },
    }];
    option.where = { deleted_at: null, }
    let user = await userRepo.getOne(option);
    option = {};
    option.include = [
      {
        model: models.activityClass,
        where: { id: user.student.activity_class_id, deleted_at: null},
        required: true,
      },
      {
        model: models.unionTextbook,
        where: { deleted_at: null},
        required: false,
      }];

    let unionTextbooks = await studentRepo.get(option);
    unionTextbooks = sequelizeUtils.convertJsonToObject(unionTextbooks);
    return unionTextbooks;
  } else {
    option = {};
    option.where = { deleted_at: null};
    option.limit = query.size ? +query.size : 10;
    option.offset = query.page ? (query.page - 1) * query.size : 1;
    query.className = query.className ? query.className: '';
    option.include = [
      {
        model: models.activityClass,
        where: {name: {[Op.like]: `%${query.className}%`}, deleted_at: null},
        required: true,
      },
      {
        model: models.unionTextbook,
        where: { deleted_at: null},
        required: false,
      }];
    if (query) {
      delete query.page;
      delete query.size;
      delete query.className;
      for (let attribute in query) {
        if (query.hasOwnProperty(attribute) && query[attribute]) {
          option.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
        }
      }
    }
    let unionTextbooks = await studentRepo.get(option);
    unionTextbooks = sequelizeUtils.convertJsonToObject(unionTextbooks);
    return unionTextbooks;
  }
};

const update = async (unionTextbooks) => {
  let falseUpdation = [];
  let trueUpdation = [];
  unionTextbooks.forEach(unionTextbook => {
    if (unionTextbook.submitted) {
      trueUpdation.push(unionTextbook.id);
    } else {
      falseUpdation.push(unionTextbook.id);
    }
  });
  const transaction = await models.sequelizeConfig.transaction();
  try {
    if (trueUpdation.length) {
      await unionTextbookRepo.update({
        submitted: true,
        submitted_at: timeUtils.getCurrentTime()
      }, trueUpdation, transaction);
    }
    if (falseUpdation.length) {
      await unionTextbookRepo.update({
        submitted: false,
        submitted_at: null,
      }, falseUpdation, transaction);
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    return false;
  }
  return true;
};

const confirmSubmission = async (currentUserId, unionTextbookIds) => {
  let option = {};
  option.include = [{ model: models.role, deleted_at: null,}];
  option.where = { id: currentUserId };
  let user = await userRepo.getOne(option);
  user = JSON.parse(JSON.stringify(user));
  const transaction = await models.sequelizeConfig.transaction();
  try {
    if (user.roles[0].name === roleUtils.CLASS_SECRETARY) {
      await unionTextbookRepo.update({
        class_confirmed: timeUtils.getCurrentTime()
      }, unionTextbookIds, transaction);
    } else {
      await unionTextbookRepo.update({
        school_confirmed: timeUtils.getCurrentTime()
      }, unionTextbookIds, transaction);
    }
    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    return false;
  }
}

module.exports = {
  get,
  update,
  confirmSubmission
};