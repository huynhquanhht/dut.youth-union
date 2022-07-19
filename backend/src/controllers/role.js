'use strict';
const roleService = require('../services/role');
const MESSAGE = require('../utils/message');

// [POST]: /role
const create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await roleService.create(name);
    if (!creation.result) {
      res.status(400).send({ message: creation.message });
      return;
    }
    res.status(200).send({ message: creation.message });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /role/all
const getAll = async (req, res) => {
  try {
    const result = await roleService.getAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /role/:id
const getById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const result = await roleService.getById(roleId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /role
const update = async (req, res) => {
  try {
    const role = req.body.role;
    if (!role.id || !role.name) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
      return;
    }
    const update = await roleService.update(role);
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

// [DELETE]: /role/:id
const del = async (req, res) => {
  try {
    const roleId = req.params.id;
    if (isNaN(roleId)) {
      res.status(400).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    const deletion = await roleService.del(roleId);
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

