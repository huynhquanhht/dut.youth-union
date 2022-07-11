'use strict'
const facultyRepo = require('../repositories/faculty');
const MESSAGE = require('../utils/message');
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');
const lectureRepo = require('../repositories/lecture');

const create = async (faculty) => {
  const option = { where: { name: faculty.name }};
  const oldFaculty = await facultyRepo.getOne(option);
  if (oldFaculty) {
    return { message: MESSAGE.EXISTED_DATA, result: false };
  }
  if (oldFaculty && oldFaculty.deleted_at) {
    const condition = { where: { id: faculty.id }};
    const newFaculty = { deleted_at: null };
    await facultyRepo.update(condition, newFaculty);
    return { message: MESSAGE.CREATE_SUCCESS, result: true };
  }
  faculty.university_union_id = 2;
  const newFaculty = await facultyRepo.create(faculty);
  if (newFaculty) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      faculty: newFaculty,
    };
  }
  return { message: MESSAGE.CREATE_FAIL, result: false };
};

const get = async () => {
  const option = {};
  option.include = [
    {
      model: models.activityClass,
      where: {deleted_at: null},
      required: false,
    },
  ];
  option.where = {deleted_at: null};
  let faculties = await facultyRepo.get(option);
  faculties = sequelizeUtils.convertJsonToObject(faculties);
  for (let faculty of faculties.rows) {
    const facultySecretary = await lectureRepo.getOne({
      where: {
        faculty_id: faculty.id,
        is_faculty_secretary: true,
      }
    })
    faculty.classQuantity = faculty.activity_classes.length;
    faculty.secretary = facultySecretary;
  }
  return faculties;
};

const getById = async (facultyId) => {
  const option = { where: { id: facultyId, deleted_at: null }};
  return facultyRepo.getOne(option);
};

const update = async (faculty) => {
  // Check find faculty
  let option = { where: { id: +faculty.id }};
  const oldFaculty = await facultyRepo.getOne(option);
  // Check existed name
  option = { where: { name: faculty.name }};
  const existedFaculty = await facultyRepo.getOne(option);
  if (!oldFaculty) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  if (existedFaculty) {
    return { message: MESSAGE.EXISTED_NAME, result: false };
  }
  let condition = { where: { id: +faculty.id }};
  const newFaculty = { name: faculty.name, address: faculty.address, email: faculty.email, phone: faculty.phone };
  const result = await facultyRepo.update(condition, newFaculty);
  if (result[0]) {
    return { message: MESSAGE.UPDATE_SUCCESS, result: true };
  }
  return { message: MESSAGE.UPDATE_FAIL, result: false };
};

const del = async (facultyId) => {
  let option = { where: { id: +facultyId, deleted_at: null }};
  const faculty = await facultyRepo.getOne(option);
  if (!faculty) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  const result =  await facultyRepo.del(option);
  if (result) {
    return { message: MESSAGE.DELETE_SUCCESS, result: true };
  }
  return { message: MESSAGE.DELETE_FAIL, result: false };
}

module.exports = {
  create,
  get,
  getById,
  update,
  del,
}