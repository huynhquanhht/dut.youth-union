'use strict';
const userService = require('/src/services/user');
const MESSAGE = require('src/utils/message.js');

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

module.exports = {
  login,
};