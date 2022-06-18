'use strict';
const models = require('../models');
const groupFunctionModel = models.groupFunction;

const create = (newGroupFunction) => {
  return groupFunctionModel.create(newGroupFunction);
};

const getByPk = (id) => {
  return groupFunctionModel.findByPk(id);
};

const getOne = (option) => {
  return groupFunctionModel.findOne(option);
};

const getAll = () => {
  return groupFunctionModel.findAndCountAll();
};

const update = (condition, newGroupFunction) => {
  return groupFunctionModel.update(newGroupFunction, condition);
};

const del = (option) => {
  return groupFunctionModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};