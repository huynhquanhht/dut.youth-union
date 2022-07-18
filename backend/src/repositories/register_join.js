'use strict';
const models = require('../models');
const registerJoinModel = models.registerJoin;

const count = (options) => {
  return registerJoinModel.count(options);
};
const getAll = (options) => {
  return registerJoinModel.findAll(options);
};

const getAllAndCount = (options) => {
  return registerJoinModel.findAndCountAll(options);
};

const getQuantity = (options) => {
  return registerJoinModel.count(options);
};

const getOne = (options) => {
  return registerJoinModel.findOne(options);
};

const create = (newRegisterJoin) => {
  return registerJoinModel.create(newRegisterJoin);
};

const update = (condition, updatedRegisterJoin) => {
  console.log('updatedRegisterJoin - ', updatedRegisterJoin);
  console.log('condition - ', condition);
  return registerJoinModel.update(updatedRegisterJoin, condition);
};

const deleteByIds = (options) => {
  return registerJoinModel.destroy(options);
};

module.exports = {
  getAll,
  getAllAndCount,
  getQuantity,
  getOne,
  create,
  update,
  deleteByIds,
  count,
}