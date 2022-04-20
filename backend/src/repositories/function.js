'use strict';
const models = require('../models');
const functionModel = models.func;

const create = (newFunction) => {
  return functionModel.create(newFunction);
};

const getByPk = (id) => {
  return functionModel.findByPk(id);
};

const getOne = (option) => {
  return functionModel.findOne(option);
};

const getAll = () => {
  return functionModel.findAndCountAll();
};

const update = (condition, newFunction) => {
  return functionModel.update(newFunction, condition);
};

const del = (option) => {
  return functionModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};