'use strict';
const models = require('../models');
const activityClassModel = models.activityClass;

const create = (newActivityClass) => {
  return activityClassModel.create(newActivityClass);
};

const createMany = async (activityClasses, transaction) => {
  return activityClassModel.bulkCreate(activityClasses, transaction);
};


const getByPk = (id) => {
  return activityClassModel.findByPk(id);
};

const get = (option) => {
  console.log(activityClassModel);
  return activityClassModel.findAndCountAll(option);
};

const getOne = (option) => {
  return activityClassModel.findOne(option);
};

const getAll = () => {
  return activityClassModel.findAndCountAll();
};

const countAll = (option) => {
  return activityClassModel.count(option);
};

const update = (condition, newActivityClass) => {
  return activityClassModel.update(newActivityClass, condition);
};

const del = (option) => {
  return activityClassModel.destroy(option);
};

module.exports = {
  create,
  createMany,
  get,
  countAll,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};