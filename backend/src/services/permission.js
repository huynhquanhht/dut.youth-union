'use strict'
const permissionRepo = require('../repositories/permission');
const MESSAGE = require('../utils/message');

const create = async (name) => {

};

const getAll = async () => {
  const option = { where: { deleted_at: null }};
  return permissionRepo.getAll(option);
};

const getById = async (permissionId) => {
  const option = { where: { id: permissionId }};
  return permissionRepo.getOne(option);
};

const update = async (permission) => {
  let condition = {};
  console.log('permissionService - ', permission);
  condition.where = { id: permission.id };
  const data = {
    is_access: permission.isAccess,
  }
  return await permissionRepo.update(condition, data);
};

const del = async (permissionId) => {
  let option = { where: { id: +permissionId }};
  const role = await permissionRepo.getOne(option);
  if (!role) {
    return { message: MESSAGE.EMPTY_DATA, result: false };
  }
  const result =  await permissionRepo.del(option);
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