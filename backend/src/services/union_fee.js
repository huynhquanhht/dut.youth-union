'use strict';
const {Op} = require('sequelize');
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');
const commonService = require("./common");
const roleUtils = require("../utils/role");
const userRepo = require("../repositories/user");
const studentRepo = require("../repositories/student");
const unionFeeRepo = require('../repositories/union_fee');

const get = async (currentUserId, query) => {
  let option = {};
  option.where = {deleted_at: null};
  option.limit = query.size ? +query.size : 10;
  option.offset = query.page ? (query.page - 1) * query.size : 1;
  if (query) {
    delete query.page;
    delete query.size;
    for (let attribute in query) {
      if (query.hasOwnProperty(attribute) && query[attribute]) {
        option.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
      }
    }
  }
  let unionFee = await unionFeeRepo.get(option);
  unionFee = sequelizeUtils.convertJsonToObject(unionFee);
  return unionFee;
};

const getOfStudent = async (currentUserId, query) => {
  let userRole = await commonService.getUserAndRole(currentUserId);
  let option = {};
  let unionFees = [];
  if (userRole.roles[0].name === roleUtils.CLASS_SECRETARY) {
    option.include = [{
      model: models.student,
      where: { deleted_at: null },
    }];
    option.where = { deleted_at: null, }
    let user = await userRepo.getOne(option);
    option = {};
    option.include = [{
      model: models.unionFee,
      where: { id: 5, deleted_at: null},
      require: true,
    },{
      model: models.activityClass,
      where: { id: user.student.activity_class_id, deleted_at: null }
    }];
    option.where = {activity_class_id: user.student.activity_class_id, deleted_at: null};
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
        model: models.unionFee,
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

  }
  unionFees = await studentRepo.get(option);
  unionFees = sequelizeUtils.convertJsonToObject(unionFees);
  unionFees.rows.forEach(item => {
    console.log(item);
    item.unionFee = item.union_fees.slice(-1)[0];
  });
  return unionFees;
}

module.exports = { get, getOfStudent };