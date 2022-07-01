'use_strict'
const MESSAGE = require('../utils/message');
const userService = require('../services/user');

const authorize = async (req, res, next) => {
  try {
    const functionId = req.headers.function_id;
    if (!functionId) {
      res.status(403).send({ message: MESSAGE.NO_PERMISSION });
      return;
    }
    const user = await userService.authorize(req.payload, functionId);
    console.log('author - ', user);
    if (user) {
      req.currentUser = user;
      next();
    } else {
      res.status(403).send({ message: MESSAGE.NO_PERMISSION });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  authorize,
};