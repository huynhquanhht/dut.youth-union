'use strict'
const models = require('../models');
const userModel = models.user;

const get = (option) => {
  return userModel.findAndCountAll(option);
};

const getOne = (option) => {
  return userModel.findOne(option);
}

module.exports = {
  get,
  getOne,
}