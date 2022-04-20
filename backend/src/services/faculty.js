'use strict'
const facultyRepo = require('../repositories/faculty');
const MESSAGE = require('../utils/message');

const create = async (name) => {
  const option = { where: { name: name }};
  const oldFaculty = await facultyRepo.getOne(option);
  if (oldFaculty) {
    return { message: MESSAGE.EXISTED_DATA, result: false };
  }
  if (oldFaculty && oldFaculty.deleted_at) {
    const condition = { where: { name: name }};
    const newFaculty = { deleted_at: null };
    await facultyRepo.update(condition, newFaculty);
    return { message: MESSAGE.CREATE_SUCCESS, result: true };
  }
  const faculty = await facultyRepo.create({ name });
  if (faculty) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      faculty: faculty,
    };
  }
  return { message: MESSAGE.CREATE_FAIL, result: false };
};

const getAll = async () => {
  const option = { where: { deleted_at: null }};
  return facultyRepo.getAll(option);
};

const getById = async (facultyId) => {
  const option = { where: { id: facultyId, deleted_at: null }};
  return facultyRepo.getOne(option);
};

const update = async (faculty) => {
  // Check find faculty
  let option = { where: { id: +faculty.id, deleted_at: null }};
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
  const newFaculty = { name: faculty.name };
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
  getAll,
  getById,
  update,
  del,
}