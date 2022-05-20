'use strict';
const studentService = require('../services/student');
const MESSAGE = require('../utils/message');

// [GET]: /student
const get = async (req, res) => {
  try {
    let query = req.query;
    const result = await studentService.get(query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
};

module.exports = {
  get,
};