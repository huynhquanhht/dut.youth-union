'use strict';
const userService = require('../services/user');
const MESSAGE = require('../utils/message.js');

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(401).send({ message: MESSAGE.LOGIN_FAIL });
  }
  try {
    const loginResult = await userService.login(username, password);
    if (!loginResult) {
      return res.status(401).send({ message: MESSAGE.LOGIN_FAIL });
    }
    return res.status(200).send({ loginResult });
  } catch (error) {
    return res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

// [GET]: /user
const get = async (req, res) => {
  try {
    let query = req.query;
    const result = await userService.get(query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /user/:id
const getById = async (req, res) => {
  try {
    let userId = req.params.id;
    const user = await userService.getById(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
};

// [GET]: /user/current-user-profile
const getCurrentUserProfile = async (req, res) => {
  try {
    const userId = req.payload.userId;
    const userProfile = await userService.getUserProfile(userId);
    res.status(200).send(userProfile);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

module.exports = {
  login,
  get,
  getById,
  getCurrentUserProfile,
};