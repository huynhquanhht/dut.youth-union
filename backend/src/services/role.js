'use strict'
const roleRepo = require('../repositories/role');
const groupFunctionRepo = require('../repositories/group_function');
const MESSAGE = require('../utils/message');
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');


const create = async (name) => {
  const option = { where: { name: name }};
  const oldRole = await roleRepo.getOne(option);
  if (oldRole) {
    return { message: MESSAGE.EXISTED_DATA, result: false };
  }
  if (oldRole && oldRole.deleted_at) {
    const condition = { where: { name: name }};
    const newRole = { deleted_at: null };
    await roleRepo.update(condition, newRole);
    return { message: MESSAGE.CREATE_SUCCESS, result: true };
  }
  const role = await roleRepo.create({ name });
  if (role) {
    return {
      message: MESSAGE.CREATE_SUCCESS,
      result: true,
      role: role,
    };
  }
  return { message: MESSAGE.CREATE_FAIL, result: false };
};

const getAll = async () => {
  let options = {};
  options.include = {
    model: models.user,
    attributes: ['id'],
    where: { deleted_at: null },
    require: false,
  };
  options.where = { deleted_at: null };
  return roleRepo.getAll(options);
};

const getById = async (roleId) => {
  let option = {};
  option.where = { id: roleId, deleted_at: null};
  option.include = [{
      model: models.func,
      where: { deleted_at: null },
      require: false,
      include: [{
        model: models.group_function,
        where: {deleted_at: null},
        require: false,
        group: ['group_function_id'],
      }]
    }];
  let role = await roleRepo.getOne(option);
  let groupFunctions = await groupFunctionRepo.getAll();
  role = JSON.parse(JSON.stringify(role));
  groupFunctions = JSON.parse(JSON.stringify(groupFunctions));
  for (let groupFunction of groupFunctions.rows) {
    groupFunction.functions = [];
    for (let func of role.functions) {
      if (func.group_function_id == groupFunction.id) {
        delete func.group_function;
        groupFunction.functions.push(func);
      }
    }
  }
  console.log(JSON.parse(JSON.stringify(groupFunctions)));
  return groupFunctions;
};

const update = async (role) => {
  // Check find role
  let option = { where: { id: +role.id, deleted_at: null }};
  const oldRole = await roleRepo.getOne(option);
  // Check existed name
  option = { where: { name: role.name }};
  const existedRole = await roleRepo.getOne(option);
  if (!oldRole) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  if (existedRole) {
    return { message: MESSAGE.EXISTED_NAME, result: false };
  }
  let condition = { where: { id: +role.id }};
  const newRole = { name: role.name };
  const result = await roleRepo.update(condition, newRole);
  if (result[0]) {
    return { message: MESSAGE.UPDATE_SUCCESS, result: true };
  }
  return { message: MESSAGE.UPDATE_FAIL, result: false };
};

const del = async (roleId) => {
  let option = { where: { id: +roleId, deleted_at: null }};
  const role = await roleRepo.getOne(option);
  if (!role) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  const result =  await roleRepo.del(option);
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