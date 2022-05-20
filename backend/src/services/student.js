'use strict'
const studentRepo = require('../repositories/student');
const MESSAGE = require('../utils/message');
const {Op} = require("sequelize");
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');

const get = async (query) => {
  let option = {};
  option.where = { deleted_at: null};
  option.limit = query.size ? +query.size : 10;
  option.offset = query.page ? (query.page - 1) * query.size : 1;
  query.className = query.className ? query.className: '';
  option.include = [
    {
      model: models.activityClass,
      where: {name: {[Op.like]: `%${query.className}%`}, deleted_at: null},
      required: true,
    }
  ];
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
  console.log(option);
  let students = await studentRepo.get(option);
  students = sequelizeUtils.convertJsonToObject(students);
  return students;
};

module.exports = {
  get,
};