'use strict';
const groupFunctionService = require('../services/group_function');
const MESSAGE = require('../utils/message');

// [POST]: /group-function
const create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await groupFunctionService.create(name);
    if (!creation.result) {
      res.status(400).send({ message: creation.message });
      return;
    }
    res.status(200).send({ message: creation.message });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /group-function/all
const getAll = async (req, res) => {
  try {
    const result = await groupFunctionService.getAll();
    console.log('result - ', JSON.parse(JSON.stringify(result)));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /group-function/:id
const getById = async (req, res) => {
  try {
    const groupFunctionId = req.params.id;
    const result = await groupFunctionService.getById(groupFunctionId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /group-function
const update = async (req, res) => {
  try {
    const groupFunction = req.body.groupFunction;
    if (!groupFunction.id || !groupFunction.name) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
      return;
    }
    const update = await groupFunctionService.update(groupFunction);
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

// [DELETE]: /group-function/:id
const del = async (req, res) => {
  try {
    const groupFunctionId = req.params.id;
    if (isNaN(groupFunctionId)) {
      res.status(400).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    const deletion = await groupFunctionService.del(groupFunctionId);
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
  getAll,
  getById,
  update,
  del
};

