'use strict';
const functionService = require('../services/function');
const MESSAGE = require('../utils/message');

// [POST]: /function
const create = async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const controllerName = req.body.controllerName;
  const actionName = req.body.actionName;
  const groupFunctionId = +req.body.groupFunctionId;
  const func = req.body;
  console.log('func - ', func);
  if (!name || !type || isNaN(type) || !controllerName || !actionName || !groupFunctionId || isNaN(groupFunctionId)) {
    console.log('a');
    res.status(400).send({message: MESSAGE.CREATE_FAIL});
    return;
  }
  try {
    const creation = await functionService.create(func);
    if (!creation.result) {
      console.log('b');
      res.status(400).send({message: creation.message});
      return;
    }
    res.status(200).send({message: creation.message});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /function/all
const getAll = async (req, res) => {
  try {
    const result = await functionService.getAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /function/:id
const getById = async (req, res) => {
  try {
    const functionId = req.params.id;
    const result = await functionService.getById(functionId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /function
const update = async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const controllerName = req.body.controllerName;
    const actionName = req.body.actionName;
    const groupFunctionId = req.body.groupFunctionId;
    const func = req.body;
    if (!id || isNaN(id) || !name || !type || isNaN(type) || !controllerName || !actionName || !groupFunctionId || isNaN((groupFunctionId))) {
      res.status(400).send({message: MESSAGE.CREATE_FAIL});
      return;
    }
    const update = await functionService.update(func);
    if (update.result) {
      res.status(200).send({message: update.message});
      return;
    }
    res.status(400).send({message: update.message});
    return;
  } catch (error) {
    res.status(500).send({message: MESSAGE.SERVER_ERROR});
  }
};

// [DELETE]: /function/:id
const del = async (req, res) => {
  try {
    const functionId = req.params.id;
    if (isNaN(functionId)) {
      res.status(400).send({message: MESSAGE.DELETE_FAIL});
      return;
    }
    const deletion = await functionService.del(functionId);
    if (deletion.result) {
      res.status(200).send({message: deletion.message});
      return;
    }
    res.status(400).send({message: deletion.message});
  } catch (error) {
    res.status(500).send({message: MESSAGE.SERVER_ERROR});
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  del
};

