'use strict';
const activityService = require('../services/activity');
const MESSAGE = require('../utils/message.js');

const getAll = async (req, res) => {
  try {
    const {page, size} = req.query;
    let activityList = await activityService.getAll(page, size);
    res.status(200).send(activityList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const get = async (req, res) => {
  try {
    const query = req.query;
    const currentUserId = req.userId;
    let activityList = await activityService.get(query, currentUserId);
    res.status(200).send(activityList);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getByCurrentStudent = async (req, res) => {
  try {
    const query = req.query;
    const currentUserId = req.userId;
    let activityList = await activityService.getByStudent(query, currentUserId);
    res.status(200).send(activityList);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

module.exports = {
  getAll,
  get,
  getByCurrentStudent
};
