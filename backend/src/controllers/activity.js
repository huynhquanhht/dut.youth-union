'use strict';
const activityService = require('../services/activity');
const MESSAGE = require('../utils/message.js');

const getAll = async (req, res) => {
  try {
    const {page, size} = req.query;
    const activityList = await activityService.getAll(page, size);
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
    const activityList = await activityService.get(query, currentUserId);
    res.status(200).send(activityList);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getByCurrentStudent = async (req, res) => {
  try {
    const query = req.query;
    const currentUserId = req.userId;
    const activityList = await activityService.getByStudent(query, currentUserId);
    res.status(200).send(activityList);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getById = async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await activityService.getById(activityId);
    res.status(200).send(activity);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const create = async (req, res) => {
  console.log('abc');
  try {
    const newActivity = req.body.newActivity;
    const currentUserId = req.payload.userId;
    if (!newActivity.activityName ||
      !newActivity.beginAt ||
      !newActivity.endAt ||
      !newActivity.beginRegistrationAt ||
      !newActivity.endRegistrationAt ||
      !newActivity.content ||
      !newActivity.coverUrl ||
      !newActivity.place ||
      !newActivity.organizationUnit ||
      !newActivity.participantQuantity ||
      !newActivity.point
    ) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
    }
    console.log('newActivity - ', newActivity);
    const isCreated = await activityService.create(newActivity, currentUserId);
    if (isCreated) {
      res.status(200).send({ message: MESSAGE.CREATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const update = async (req, res) => {
  try {
    console.log('abc');
    const activityId = req.body.activityId;
    const newActivity = req.body.newActivity;
    if (!newActivity.activityName ||
      !newActivity.beginAt ||
      !newActivity.endAt ||
      !newActivity.beginRegistrationAt ||
      !newActivity.endRegistrationAt ||
      !newActivity.content ||
      !newActivity.coverUrl ||
      !newActivity.place ||
      !newActivity.organizationUnit ||
      !newActivity.participantQuantity ||
      !newActivity.point
    ) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
    }
    const isUpdated = await activityService.update(activityId, newActivity);
    if (isUpdated) {
      res.status(200).send({ message: MESSAGE.UPDATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const deleteActivity = async (req, res) => {
  try {
    const activityIds = req.body.activityIds;
    if (!Array.isArray(activityIds) || !activityIds.length) {
      res.status(400).send({ message: MESSAGE.INVALID_DATA });
      return;
    }
    const deletionResult = await activityService.deleteByIds(activityIds);
    res.status(200).send({
      message:
        MESSAGE.DELETE_SUCCESS + ` (${deletionResult}/${activityIds.length})`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  getAll,
  get,
  getByCurrentStudent,
  getById,
  create,
  update,
  deleteActivity,
};
