'use strict';
const models = require('../models');
const roleModel = models.role;

const create = (newRole) => {
  return roleModel.create(newRole);
};

const getByPk = (id) => {
  return roleModel.findByPk(id);
};

const getOne = (option) => {
  return roleModel.findOne(option);
};

const getAll = (options) => {
  return roleModel.findAndCountAll(options);
};

const update = (condition, newRole) => {
  return roleModel.update(newRole, condition);
};

const del = (option) => {
  return roleModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};