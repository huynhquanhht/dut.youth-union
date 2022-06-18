'use strict';
const models = require('../models');
const roleOfUserModel = models.roleOfUser;

const getAll = (options) => {
  return roleOfUserModel.findAll(options);
};

const getAllAndCount = (options) => {
  return roleOfUserModel.findAndCountAll(options);
};

const getQuantity = (options) => {
  return roleOfUserModel.count(options);
};

const getById = (options) => {
  return roleOfUserModel.findOne(options);
};

const create = (newRoleOfUser) => {
  console.log('newRoleOfUser - ', newRoleOfUser);
  return roleOfUserModel.create(newRoleOfUser);
};

const createMany = async (roleOfUsers, transaction) => {
  return roleOfUserModel.bulkCreate(roleOfUsers, {transaction: transaction});
};


const updateById = (updatedRoleOfUser, condition) => {
  return roleOfUserModel.update(updatedRoleOfUser, condition);
};

const deleteByIds = (options) => {
  return roleOfUserModel.destroy(options);
};

module.exports = {
  getAll,
  getAllAndCount,
  getQuantity,
  getById,
  create,
  createMany,
  updateById,
  deleteByIds,
}