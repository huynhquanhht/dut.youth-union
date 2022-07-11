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
    let user = await userService.authorize(req.payload, functionId);
    user = JSON.parse(JSON.stringify(user));
    if (!!user && user.rows[0].roles[0].functions[0].permission.is_access) {
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