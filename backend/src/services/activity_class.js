'use strict'
const activityClassRepo = require('../repositories/activity_class');
const MESSAGE = require('../utils/message');
const {Op} = require("sequelize");
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');
const userRepo = require("../repositories/user");
const lectureRepo = require("../repositories/lecture");
const studentRepo = require("../repositories/student");
const roleUtils = require("../utils/role");

const create = async (activityClass) => {
  const option = {where: {name: activityClass.name}};
  const oldActivityClass = await activityClassRepo.getOne(option);
  if (oldActivityClass) {
    return {message: MESSAGE.EXISTED_DATA, result: false};
  }
  if (oldActivityClass && oldActivityClass.deleted_at) {
    const condition = {where: {name: activityClass.name}};
    const newActivityClass = {deleted_at: null};
    await activityClassRepo.update(condition, newActivityClass);
    return {message: MESSAGE.CREATE_SUCCESS, result: true};
  }
  const newActivityClass = await activityClassRepo.create({
    id: activityClass.id,
    name: activityClass.name,
    course_id: activityClass.course_id,
    faculty_id: activityClass.faculty_id,
  });
  if (newActivityClass) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      activityClass: newActivityClass,
    };
  }
  return {message: MESSAGE.CREATE_FAIL, result: false};
};

const createMany = async (activityClasses) => {
  let transaction;
  try {
    transaction = await models.sequelizeConfig.transaction();
    const isCreated = await activityClassRepo.createMany(activityClasses, {transaction});
    await transaction.commit();
    return isCreated;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    return null;
  }
}

const get = async (query, userId) => {
  let option = {};
  let optionCount = {};
  if (query.option && query.option === 'all') {
    delete query.option;
  } else {
    option.limit = query.size ? +query.size : 10;
    option.offset = query.page ? (query.page - 1) * query.size : 1;
  }
  option.where = {deleted_at: null};

  query.facultyName = query.facultyName ? query.facultyName : '';
  query.facultyId = query.facultyId ? query.facultyId : '';
  query.courseName = query.courseName ? query.courseName : '';
  const user = await getUserAndRole(userId);
  if (user.roles[0].name === roleUtils.FACULTY_SECRETARY) {
    const lecture = await lectureRepo.getOne({ where: {user_id: user.id}});
    const facultyId = lecture.faculty_id;
    option.include = [
      {
        model: models.course,
        where: {name: {[Op.like]: `%${query.courseName}%`}, deleted_at: null},
        required: true,
      },
      {
        model: models.faculty,
        where: {id: facultyId},
        required: true,
      },
      {
        model: models.student,
        where: {deleted_at: null},
        required: false,
      },
    ];
    optionCount = {where: {faculty_id: facultyId}};
  } else {
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
    optionCount = {};
  }

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
  // Student, class = , is_secretary = true
  let activityClassList = await activityClassRepo.get(option);
  let count = await activityClassRepo.countAll(optionCount);
  activityClassList = sequelizeUtils.convertJsonToObject(activityClassList);
  for (let activityClass of activityClassList.rows) {
    let secretary = await studentRepo.getOne({ where: {
        activity_class_id: activityClass.id,
        is_class_secretary: true,
      }});
    secretary = JSON.parse(JSON.stringify(secretary));
    activityClass.unionMemberQuantity = activityClass.students.filter(
      (student) => student.unionMemberQuantity !== null).length;
    activityClass.unionTextbookQuantity = activityClass.students.filter(
      (student) => student.submitted_union_book_at !== null).length;
    activityClass.studentQuantity = activityClass.students.length;
    activityClass.secretary = secretary;
  }
  return {
    count: count,
    rows: activityClassList.rows,
  };
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
  let option = {where: {id: activityClass.id, deleted_at: null}};
  const oldActivityClass = await activityClassRepo.getOne(option);
  // Check existed name
  // option = {where: {name: activityClass.name}};
  // const existedActivityClass = await activityClassRepo.getOne(option);
  // if (!oldActivityClass) {
  //   return {message: MESSAGE.EMPTY_DATA, result: false};
  // }
  // if (existedActivityClass) {
  //   return {message: MESSAGE.EXISTED_NAME, result: false};
  // }
  let condition = {where: {id: activityClass.id}};
  const newActivityClass = {
    name: activityClass.name,
    course_id: activityClass.course_id,
    faculty_id: activityClass.faculty_id,
  };
  const result = await activityClassRepo.update(condition, newActivityClass);
  if (result[0]) {
    return {message: MESSAGE.UPDATE_SUCCESS, result: true};
  }
  return {message: MESSAGE.UPDATE_FAIL, result: false};
};

const del = async (activityClassId) => {
  let option = {where: {id: activityClassId }};
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

const getUserAndRole = async (currentUserId) => {
  let option = {};
  option.include = [{ model: models.role, deleted_at: null,}];
  option.where = { id: currentUserId, deleted_at: null };
  let user = await userRepo.getOne(option);
  user = JSON.parse(JSON.stringify(user));
  return user;
}

module.exports = {
  create,
  createMany,
  getAll,
  getById,
  update,
  del,
  get,
}