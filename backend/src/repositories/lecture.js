'use strict';
const models = require('../models');
const lectureModel = models.lecture;

const create = (newLecture) => {
  return lectureModel.create(newLecture);
};

const createMany = async (lectures, transaction) => {
  return lectureModel.bulkCreate(lectures, transaction);
};


const getByPk = (id) => {
  return lectureModel.findByPk(id);
};

const get = (option) => {
  console.log(lectureModel);
  return lectureModel.findAndCountAll(option);
};

const getOne = (option) => {
  return lectureModel.findOne(option);
};

const getAll = () => {
  return lectureModel.findAndCountAll();
};

const countAll = (option) => {
  return lectureModel.count(option);
};

const update = (condition, newLecture) => {
  return lectureModel.update(newLecture, condition);
};

const del = (option) => {
  return lectureModel.destroy(option);
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