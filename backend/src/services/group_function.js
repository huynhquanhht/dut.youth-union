'use strict'
const groupFunctionRepo = require('../repositories/group_function');
const MESSAGE = require('../utils/message');

const create = async (name) => {
  const option = { where: { name: name }};
  const oldGroupFunction = await groupFunctionRepo.getOne(option);
  if (oldGroupFunction) {
    return { message: MESSAGE.EXISTED_DATA, result: false };
  }
  if (oldGroupFunction && oldGroupFunction.deleted_at) {
    const condition = { where: { name: name }};
    const newGroupFunction = { deleted_at: null };
    await groupFunctionRepo.update(condition, newGroupFunction);
    return { message: MESSAGE.CREATE_SUCCESS, result: true };
  }
  const groupFunction = await groupFunctionRepo.create({ name });
  if (groupFunction) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      groupFunction: groupFunction,
    };
  }
  return { message: MESSAGE.CREATE_FAIL, result: false };
};

const getAll = async () => {
  const option = { where: { deleted_at: null }};
  return groupFunctionRepo.getAll(option);
};

const getById = async (groupFunctionId) => {
  const option = { where: { id: groupFunctionId, deleted_at: null }};
  return groupFunctionRepo.getOne(option);
};

const update = async (groupFunction) => {
  // Check find group function
  let option = { where: { id: +groupFunction.id, deleted_at: null }};
  const oldGroupFunction = await groupFunctionRepo.getOne(option);
  // Check existed name
  option = { where: { name: groupFunction.name }};
  const existedGroupFunction = await groupFunctionRepo.getOne(option);
  if (!oldGroupFunction) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  if (existedGroupFunction) {
    return { message: MESSAGE.EXISTED_NAME, result: false };
  }
  let condition = { where: { id: +groupFunction.id }};
  const newGroupFunction = { name: groupFunction.name };
  const result = await groupFunctionRepo.update(condition, newGroupFunction);
  if (result[0]) {
    return { message: MESSAGE.UPDATE_SUCCESS, result: true };
  }
  return { message: MESSAGE.UPDATE_FAIL, result: false };
};

const del = async (groupFunctionId) => {
  let option = { where: { id: +groupFunctionId, deleted_at: null }};
  const groupFunction = await groupFunctionRepo.getOne(option);
  if (!groupFunction) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  const result =  await groupFunctionRepo.del(option);
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