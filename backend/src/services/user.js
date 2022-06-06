'use strict'
const userRepo = require('../repositories/user');
const MESSAGE = require('../utils/message');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const authorize = async (payload, functionId) => {
  const option = {};
  option.include = [
    {
      model: models.role,
      where: { deleted_at: null },
      order: ['id', 'ASC'],
      required: false,
      include: [{
        model: models.func,
        where: { id: functionId, deleted_at: null },
        required: false,
        include: [
          {
            model: models.group_function,
            where: { deleted_at: null },
            required: false,
          }
        ]
      }]
    }
  ];
  // option.attributes =  {exclude: ['password']};
  option.where = { id: payload.userId, deleted_at: null };
  let user = await userRepo.get(option);
  if (user.rows[0].roles[0].functions[0].id == functionId) {
    return user;
  }
  return null;
};

const get = async () => {
  const option = {};
  option.include = [
    {
      model: models.role,
      where: { deleted_at: null},
      required: false,
    }
  ];
  option.where = { deleted_at: null};
  let users = await userRepo.get(option);
  return users;
};

const getById = async (userId) => {
  const options = {};
  options.include = [{
    model: models.role,
    where: { deleted_at: null,},
    require: false,
  }];
  options.where = { id: userId, deleted_at: null };
  options.attributes = ['id', 'name', 'username']
  const user = await userRepo.getOne(options);
  return user;
};

const login = async (username, password) => {
  let options = {}
  options.where = { username: username, is_active: true, deleted_at: null };
  const user = await userRepo.getOne(options);
  if (!user) {
    return null;
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return null;
  }
  const payload = {
    userId: user.id,
    name: user.name,
  };
  const accessToken = await jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: process.env.TOKEN_TIMEOUT,
  });
  const loginResult = {
    currentUser: {
      name: user.name,
      email: user.email,
    },
    accessToken: accessToken,
  };
  return loginResult;
};


module.exports = { get, authorize, login, getById };