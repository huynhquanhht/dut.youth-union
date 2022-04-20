'use strict'
const activityClassRepo = require('../repositories/activity_class');
const MESSAGE = require('../utils/message');

const create = async (name) => {
  const option = { where: { name: name }};
  const oldActivityClass = await activityClassRepo.getOne(option);
  if (oldActivityClass) {
    return { message: MESSAGE.EXISTED_DATA, result: false };
  }
  if (oldActivityClass && oldActivityClass.deleted_at) {
    const condition = { where: { name: name }};
    const newActivityClass = { deleted_at: null };
    await activityClassRepo.update(condition, newActivityClass);
    return { message: MESSAGE.CREATE_SUCCESS, result: true };
  }
  const activityClass = await activityClassRepo.create({ name });
  if (activityClass) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      activityClass: activityClass,
    };
  }
  return { message: MESSAGE.CREATE_FAIL, result: false };
};

const getAll = async () => {
  const option = { where: { deleted_at: null }};
  return activityClassRepo.getAll(option);
};

const getById = async (activityClassId) => {
  const option = { where: { id: activityClassId, deleted_at: null }};
  return activityClassRepo.getOne(option);
};

const update = async (activityClass) => {
  // Check find activityClass
  let option = { where: { id: +activityClass.id, deleted_at: null }};
  const oldActivityClass = await activityClassRepo.getOne(option);
  // Check existed name
  option = { where: { name: activityClass.name }};
  const existedActivityClass = await activityClassRepo.getOne(option);
  if (!oldActivityClass) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  if (existedActivityClass) {
    return { message: MESSAGE.EXISTED_NAME, result: false };
  }
  let condition = { where: { id: +activityClass.id }};
  const newActivityClass = { name: activityClass.name };
  const result = await activityClassRepo.update(condition, newActivityClass);
  if (result[0]) {
    return { message: MESSAGE.UPDATE_SUCCESS, result: true };
  }
  return { message: MESSAGE.UPDATE_FAIL, result: false };
};

const del = async (activityClassId) => {
  let option = { where: { id: +activityClassId, deleted_at: null }};
  const activityClass = await activityClassRepo.getOne(option);
  if (!activityClass) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  const result =  await activityClassRepo.del(option);
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