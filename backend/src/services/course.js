'use strict'
const courseRepo = require('../repositories/course');
const MESSAGE = require('../utils/message');

const create = async (name) => {
  const option = { where: { name: name }};
  const oldCourse = await courseRepo.getOne(option);
  if (oldCourse) {
    return { message: MESSAGE.EXISTED_DATA, result: false };
  }
  if (oldCourse && oldCourse.deleted_at) {
    const condition = { where: { name: name }};
    const newCourse = { deleted_at: null };
    await courseRepo.update(condition, newCourse);
    return { message: MESSAGE.CREATE_SUCCESS, result: true };
  }
  const course = await courseRepo.create({ name });
  if (course) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      course: course,
    };
  }
  return { message: MESSAGE.CREATE_FAIL, result: false };
};

const getAll = async () => {
  const option = { where: { deleted_at: null }};
  return courseRepo.getAll(option);
};

const getById = async (courseId) => {
  const option = { where: { id: courseId, deleted_at: null }};
  return courseRepo.getOne(option);
};

const update = async (course) => {
  // Check find course
  let option = { where: { id: +course.id, deleted_at: null }};
  const oldCourse = await courseRepo.getOne(option);
  // Check existed name
  option = { where: { name: course.name }};
  const existedCourse = await courseRepo.getOne(option);
  if (!oldCourse) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  if (existedCourse) {
    return { message: MESSAGE.EXISTED_NAME, result: false };
  }
  let condition = { where: { id: +course.id }};
  const newCourse = { name: course.name };
  const result = await courseRepo.update(condition, newCourse);
  if (result[0]) {
    return { message: MESSAGE.UPDATE_SUCCESS, result: true };
  }
  return { message: MESSAGE.UPDATE_FAIL, result: false };
};

const del = async (courseId) => {
  let option = { where: { id: +courseId, deleted_at: null }};
  const course = await courseRepo.getOne(option);
  if (!course) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  const result =  await courseRepo.del(option);
  if (result) {
    return { message: MESSAGE.DELETE_SUCCESS, result: true };
  }
  return { message: MESSAGE.DELETE_FAIL, result: false };
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  del,
}