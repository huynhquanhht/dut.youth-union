'use strict';
const models = require('../models');
const submitUnionFee = models.submitUnionFee;

const create = (newSubmitUnionFee) => {
  return submitUnionFee.create(newSubmitUnionFee);
};

const createMany = async (unionFeeSubmission, transaction) => {
  console.log('bulkCreate - ', unionFeeSubmission);
  return await submitUnionFee.bulkCreate(unionFeeSubmission, {transaction: transaction});
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
  createMany,
  getByPk,
  getOne,
  get,
  update,
  del,
  count,
};