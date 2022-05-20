'use strict';
const models = require('../models');
const unionFeeModel = models.unionFee;

const create = (newUnionTextbook) => {
  return unionFeeModel.create(newUnionTextbook);
};

const getByPk = (id) => {
  return unionFeeModel.findByPk(id);
};

const getOne = (option) => {
  return unionFeeModel.findOne(option);
};

const count = (option) => {
  return unionFeeModel.count(option);
}

const get = (option) => {
  return unionFeeModel.findAndCountAll(option);
};

const update = (unionTextbook, ids, transaction) => {
  return unionFeeModel.update(
    unionTextbook,
    { where: { id: ids }},
    transaction);
};

const del = (option) => {
  return unionFeeModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  get,
  update,
  del,
  count,
};