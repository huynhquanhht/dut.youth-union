'use strict';
const models = require('../models');
const studentModel = models.student;

const create = (newStudent) => {
  return studentModel.create(newStudent);
};

const getByPk = (id) => {
  return studentModel.findByPk(id);
};

const getOne = (option) => {
  return studentModel.findOne(option);
};

const count = (option) => {
  return studentModel.count(option);
}

const get = (option) => {
  return studentModel.findAndCountAll(option);
};

const update = (condition, newStudent) => {
  return studentModel.update(newStudent, condition);
};

const del = (option) => {
  return studentModel.destroy(option);
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