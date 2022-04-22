'use strict';
const models = require('../models');
const courseModel = models.course;

const create = (newCourse) => {
  return courseModel.create(newCourse);
};

const getByPk = (id) => {
  return courseModel.findByPk(id);
};

const getOne = (option) => {
  return courseModel.findOne(option);
};

const getAll = () => {
  return courseModel.findAndCountAll();
};

const update = (condition, newCourse) => {
  return courseModel.update(newCourse, condition);
};

const del = (option) => {
  return courseModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};