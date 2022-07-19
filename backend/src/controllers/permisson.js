'use strict';
const permissionService = require('../services/permission');
const MESSAGE = require('../utils/message');

// [POST]: /permission
const create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await permissionService.create(name);
    if (!creation.result) {
      res.status(400).send({ message: creation.message });
      return;
    }
    res.status(200).send({ message: creation.message });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /permission/all
const getAll = async (req, res) => {
  try {
    const result = await permissionService.getAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /permission/:id
const getById = async (req, res) => {
  try {
    const permissionId = req.params.id;
    const result = await permissionService.getById(permissionId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /permission
const update = async (req, res) => {
  try {
    console.log(req.body.permission);
    const permission = req.body.permission;
    console.log('permission - ', permission);
    if (!permission.id) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
      return;
    }
    const update = await permissionService.update(permission);
    if (!!update[0]) {
      res.status(200).send({ message: update.message });
      return;
    }
    res.status(400).send({ message: update.message });
    return;
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
};

// [DELETE]: /permission/:id
const del = async (req, res) => {
  try {
    const permissionId = req.params.id;
    if (isNaN(permissionId)) {
      res.status(400).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    const deletion = await permissionService.del(permissionId);
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

