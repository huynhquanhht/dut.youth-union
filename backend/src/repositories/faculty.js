'use strict';
const models = require('../models');
const facultyModel = models.faculty;

const create = (newFaculty) => {
  return facultyModel.create(newFaculty);
};

const getByPk = (id) => {
  return facultyModel.findByPk(id);
};

const getOne = (option) => {
  return facultyModel.findOne(option);
};

const getAll = () => {
  return facultyModel.findAndCountAll();
};

const update = (condition, newFaculty) => {
  return facultyModel.update(newFaculty, condition);
};

const del = (option) => {
  return facultyModel.destroy(option);
};

module.exports = {
  create,
  getByPk,
  getOne,
  getAll,
  update,
  del,
};