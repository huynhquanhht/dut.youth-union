'use strict'
const models = require('../models');
const userModel = models.user;

const create = (newUser, transaction) => {
  return userModel.create(newUser, transaction);
};

const createMany = async (users, transaction) => {
  return userModel.bulkCreate(users, {transaction: transaction});
};

const get = (option) => {
  return userModel.findAndCountAll(option);
};

const getOne = (option) => {
  return userModel.findOne(option);
}

module.exports = {
  get,
  getOne,
  create,
  createMany,
}