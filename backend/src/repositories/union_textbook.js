'use strict';
const models = require('../models');
const unionTextbookModel = models.unionTextbook;

const create = (newUnionTextbook) => {
  return unionTextbookModel.create(newUnionTextbook);
};

const getByPk = (id) => {
  return unionTextbookModel.findByPk(id);
};

const getOne = (option) => {
  return unionTextbookModel.findOne(option);
};

const count = (option) => {
  return unionTextbookModel.count(option);
}

const get = (option) => {
  return unionTextbookModel.findAndCountAll(option);
};

const update = (unionTextbook, ids, transaction) => {
  return unionTextbookModel.update(
    unionTextbook,
    { where: { id: ids }},
    transaction);
};

const del = (option) => {
  return unionTextbookModel.destroy(option);
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