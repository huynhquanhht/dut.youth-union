'use strict';
const models = require('../models');
const submitUnionFee = models.submitUnionFee;

const create = (newSubmitUnionFee) => {
  return submitUnionFee.create(newSubmitUnionFee);
};

const getByPk = (id) => {
  return submitUnionFee.findByPk(id);
};

const getOne = (option) => {
  return submitUnionFee.findOne(option);
};

const count = (option) => {
  return submitUnionFee.count(option);
}

const get = (option) => {
  return submitUnionFee.findAndCountAll(option);
};

const update = (unionFee, ids, transaction) => {
  return submitUnionFee.update(
    unionFee,
    { where: { id: ids }},
    transaction);
};

const del = (option) => {
  return submitUnionFee.destroy(option);
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