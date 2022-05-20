'use strict'
const activityClassRepo = require('../repositories/activity_class');
const MESSAGE = require('../utils/message');
const {Op} = require("sequelize");
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');

const create = async (name) => {
  const option = {where: {name: name}};
  const oldActivityClass = await activityClassRepo.getOne(option);
  if (oldActivityClass) {
    return {message: MESSAGE.EXISTED_DATA, result: false};
  }
  if (oldActivityClass && oldActivityClass.deleted_at) {
    const condition = {where: {name: name}};
    const newActivityClass = {deleted_at: null};
    await activityClassRepo.update(condition, newActivityClass);
    return {message: MESSAGE.CREATE_SUCCESS, result: true};
  }
  const activityClass = await activityClassRepo.create({name});
  if (activityClass) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      activityClass: activityClass,
    };
  }
  return {message: MESSAGE.CREATE_FAIL, result: false};
};

const get = async (query) => {
  let option = {};
  option.where = {deleted_at: null};
  option.limit = query.size ? +query.size : 10;
  option.offset = query.page ? (query.page - 1) * query.size : 1;
  query.facultyName = query.facultyName ? query.facultyName : '';
  query.courseName = query.courseName ? query.courseName : '';
  option.include = [
  {
    model: models.course,
    where: {name: {[Op.like]: `%${query.courseName}%`}, deleted_at: null},
    required: true,
  },
  {
    model: models.faculty,
    where: {name: {[Op.like]: `%${query.facultyName}%`}, deleted_at: null},
    required: true,
  },
  {
    model: models.student,
    where: {deleted_at: null},
    required: false,
  },
];
  if (query) {
    delete query.page;
    delete query.size;
    delete query.facultyName;
    delete query.courseName;
    for (let attribute in query) {
      if (query.hasOwnProperty(attribute) && query[attribute]) {
        option.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
      }
    }
  }
  let activityClassList = await activityClassRepo.get(option);
  activityClassList = sequelizeUtils.convertJsonToObject(activityClassList);
  for (let activityClass of activityClassList.rows) {
    activityClass.unionMemberQuantity = activityClass.students.filter(
      (student) => student.unionMemberQuantity !== null).length;
    activityClass.unionTextbookQuantity = activityClass.students.filter(
      (student) => student.submitted_union_book_at !== null).length;
    activityClass.studentQuantity = activityClass.students.length;
  }
  return activityClassList;
};

const getAll = async () => {
  const option = {where: {deleted_at: null}};
  return activityClassRepo.getAll(option);
};

const getById = async (activityClassId) => {
  const option = {where: {id: activityClassId, deleted_at: null}};
  return activityClassRepo.getOne(option);
};

const update = async (activityClass) => {
  // Check find activityClass
  let option = {where: {id: +activityClass.id, deleted_at: null}};
  const oldActivityClass = await activityClassRepo.getOne(option);
  // Check existed name
  option = {where: {name: activityClass.name}};
  const existedActivityClass = await activityClassRepo.getOne(option);
  if (!oldActivityClass) {
    return {message: MESSAGE.EMPTY_DATA, result: false};
  }
  if (existedActivityClass) {
    return {message: MESSAGE.EXISTED_NAME, result: false};
  }
  let condition = {where: {id: +activityClass.id}};
  const newActivityClass = {name: activityClass.name};
  const result = await activityClassRepo.update(condition, newActivityClass);
  if (result[0]) {
    return {message: MESSAGE.UPDATE_SUCCESS, result: true};
  }
  return {message: MESSAGE.UPDATE_FAIL, result: false};
};

const del = async (activityClassId) => {
  let option = {where: {id: +activityClassId, deleted_at: null}};
  const activityClass = await activityClassRepo.getOne(option);
  if (!activityClass) {
    return {message: MESSAGE.EMPTY_DATA, result: false};
  }
  const result = await activityClassRepo.del(option);
  if (result) {
    return {message: MESSAGE.DELETE_SUCCESS, result: true};
  }
  return {message: MESSAGE.DELETE_FAIL, result: false};
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  del,
  get,
}