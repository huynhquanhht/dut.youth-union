'use strict';
const models = require('../models');
const activityModel = models.activity;

const getAll = (options) => {
  console.log(options);
  return activityModel.findAll(options);
};

const getAllAndCount = (options) => {
  return activityModel.findAndCountAll(options);
};

const getQuantity = (options) => {
  return activityModel.count(options);
};

const getById = (options) => {
  return activityModel.findOne(options);
};

const create = (newActivity) => {
  return activityModel.create(newActivity);
};

const updateById = (updatedActivity, condition) => {
  return activityModel.update(updatedActivity, condition);
};

const deleteByIds = (options) => {
  return activityModel.destroy(options);
};

module.exports = {
  getAll,
  getAllAndCount,
  getQuantity,
  getById,
  create,
  updateById,
  deleteByIds,
}