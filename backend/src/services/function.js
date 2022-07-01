'use strict'
const functionRepo = require('../repositories/function');
const MESSAGE = require('../utils/message');
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');

const create = async (func) => {
  const option = {where: {name: func.name}};
  const oldFunction = await functionRepo.getOne(option);
  if (oldFunction) {
    return {message: MESSAGE.EXISTED_DATA, result: false};
  }
  if (oldFunction && oldFunction.deleted_at) {
    const condition = {where: {name: func.name}};
    const newFunction = {deleted_at: null};
    await functionRepo.update(condition, newFunction);
    return {message: MESSAGE.CREATE_SUCCESS, result: true};
  }
  const newFunction = await functionRepo.create({
    name: func.name,
    type: func.type,
    controller_name: func.controllerName,
    action_name: func.actionName,
    group_function_id: func.groupFunctionId,
  });
  if (newFunction) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      func: newFunction,
    };
  }
  return {message: MESSAGE.CREATE_FAIL, result: false};
};

const getAll = async () => {
  const option = {};
  option.include = {
    model: models.groupFunction,
    where: { deleted_at: null},
  };
  option.where = { deleted_at: null };
  return functionRepo.getAll(option);
};

const getById = async (functionId) => {
  const option = {where: {id: functionId, deleted_at: null}};
  return functionRepo.getOne(option);
};

const update = async (func) => {
  // Check find function
  let option = {where: {id: +func.id, deleted_at: null}};
  const oldFunction = await functionRepo.getOne(option);
  // Check existed name
  option = {where: {name: func.name}};
  const existedFunction = await functionRepo.getOne(option);
  if (!oldFunction) {
    return {message: MESSAGE.EMPTY_DATA, result: false};
  }
  if (existedFunction) {
    return {message: MESSAGE.EXISTED_NAME, result: false};
  }
  let condition = {where: {id: +func.id}};
  const newFunction = {
    name: func.name,
    type: func.type,
    controller_name: func.controllerName,
    action_name: func.actionName,
    group_function_id: func.groupFunctionId,
  };
  const result = await functionRepo.update(condition, newFunction);
  if (result[0]) {
    return {message: MESSAGE.UPDATE_SUCCESS, result: true};
  }
  return {message: MESSAGE.UPDATE_FAIL, result: false};
};

const del = async (functionId) => {
  let option = {where: {id: +functionId, deleted_at: null}};
  const func = await functionRepo.getOne(option);
  if (!func) {
    return {message: MESSAGE.EMPTY_DATA, result: false};
  }
  const result = await functionRepo.del(option);
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
}