'use strict';
const registerJoinService = require('../services/register_join');
const MESSAGE = require('../utils/message.js');

const getAll = async (req, res) => {
  try {
    const {page, size} = req.query;
    const registerJoinList = await registerJoinService.getAll(page, size);
    res.status(200).send(registerJoinList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const get = async (req, res) => {
  try {
    const query = req.query;
    const currentUserId = req.userId;
    const registerJoinList = await registerJoinService.get(query, currentUserId);
    res.status(200).send(registerJoinList);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getById = async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await registerJoinService.getById(registerJoinId);
    res.status(200).send(activity);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const create = async (req, res) => {
  try {
    const newActivity = req.body.newActivity;
    const isCreated = await registerJoinService.create(newActivity);
    if (isCreated) {
      res.status(200).send({ message: MESSAGE.CREATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const update = async (req, res) => {
  try {
    const registerJoinId = req.body.registerJoinId;
    const newActivity = req.body.newRegisterJoin;
    const isUpdated = await registerJoinService.update(registerJoinId, newRegisterJoin);
    if (isUpdated) {
      res.status(200).send({ message: MESSAGE.UPDATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const deleteActivity = async (req, res) => {
  try {
    const registerJoinId = req.params.id;
    const isDeleted = await registerJoinService.deleteActivity(registerJoinId);
    if (isDeleted) {
      res.status(200).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    res.status(400).send({ message: MESSAGE.DELETE_FAIL });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  getAll,
  get,
  getById,
  create,
  update,
  deleteActivity,
};
