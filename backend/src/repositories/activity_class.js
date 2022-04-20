'use strict';
const models = require('../models');
const activityClassModel = models.activity_class;

const create = (newActivityClass) => {
  return activityClassModel.create(newActivityClass);
};

const getByPk = (id) => {
  return activityClassModel.findByPk(id);
};

const getOne = (option) => {
  return activityClassModel.findOne(option);
};

const getAll = () => {
  return activityClassModel.findAndCountAll();
};

const update = (condition, newActivityClass) => {
  return activityClassModel.update(newActivityClass, condition);
};

const del = (option) => {
  return activityClassModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};