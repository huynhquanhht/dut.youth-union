'use strict';
const models = require('../models');
const newsModel = models.news;

const getAll = (options) => {
  console.log(options);
  return newsModel.findAll(options);
};

const getAllAndCount = (options) => {
  return newsModel.findAndCountAll(options);
};

const getQuantity = (options) => {
  return newsModel.count(options);
};

const getById = (options) => {
  return newsModel.findOne(options);
};

const create = (newActivity) => {
  return newsModel.create(newActivity);
};

const updateById = (updatedActivity, condition) => {
  return newsModel.update(updatedActivity, condition);
};

const deleteByIds = (options) => {
  return newsModel.destroy(options);
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