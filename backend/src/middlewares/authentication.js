'use strict';
const MESSAGE = require('../utils/message');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authorHeader = req.headers['authorization'];
    const accessToken = authorHeader && authorHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).send({ message: MESSAGE.NO_TOKEN });
    }
    jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY, (error, payload) => {
      if (error) {
        return res.status(401).send(MESSAGE.INVALID_TOKEN);
      }
      req.payload = payload;
      next();
    });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

module.exports = {
  authenticateToken,
};
