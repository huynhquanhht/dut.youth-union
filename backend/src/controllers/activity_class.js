'use strict';
const activityClassService = require('../services/activity_class');
const MESSAGE = require('../utils/message');

// [POST]: /activity-class
const create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await activityClassService.create(name);
    if (!creation.result) {
      res.status(400).send({ message: creation.message });
      return;
    }
    res.status(200).send({ message: creation.message });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /activity-class
const get = async (req, res) => {
  try {
    let query = req.query;
    let result = await activityClassService.get(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /activity-class/:id
const getById = async (req, res) => {
  try {
    const activityClassId = req.params.id;
    const result = await activityClassService.getById(activityClassId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /activity-class
const update = async (req, res) => {
  try {
    const activityClass = req.body.activityClass;
    if (!activityClass.id || !activityClass.name) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
      return;
    }
    const update = await activityClassService.update(activityClass);
    if (update.result) {
      res.status(200).send({ message: update.message });
      return;
    }
    res.status(400).send({ message: update.message });
    return;
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
};

// [DELETE]: /activity-class/:id
const del = async (req, res) => {
  try {
    const activityClassId = req.params.id;
    if (isNaN(activityClassId)) {
      res.status(400).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    const deletion = await activityClassService.del(activityClassId);
    if (deletion.result) {
      res.status(200).send({ message: deletion.message });
      return;
    }
    res.status(400).send({ message: deletion.message });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  create,
  get,
  getById,
  update,
  del
};

