'use strict'
const unionFeeService = require('../services/union_fee');
const MESSAGE = require('../utils/message');

// [GET]: /union-fee
const get = async (req, res) => {
  try {
    let query = req.query;
    let currentUserId = req.payload.userId;
    const result = await unionFeeService.get(currentUserId, query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

// [GET]: /union-fee/student
const getOfStudent = async (req, res) => {
  try {
    let query = req.query;
    let currentUserId = req.payload.userId;
    const result = await unionFeeService.getOfStudent(currentUserId, query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  get, getOfStudent,
};