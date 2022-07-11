'use strict';
const models = require('../models');
const permissionModel = models.permission;

const create = (newPermission) => {
  return permissionModel.create(newPermission);
};

const getByPk = (id) => {
  return permissionModel.findByPk(id);
};

const getOne = (option) => {
  return permissionModel.findOne(option);
};

const getAll = (options) => {
  return permissionModel.findAndCountAll(options);
};

const update = (condition, newPermission) => {
  console.log('condition - ', condition);
  console.log('newPermission - ', newPermission);
  return permissionModel.update(newPermission, condition);
};

const del = (option) => {
  return permissionModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};