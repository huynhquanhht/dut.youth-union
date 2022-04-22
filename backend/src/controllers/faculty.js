'use strict';
const facultyService = require('../services/faculty');
const MESSAGE = require('../utils/message');

// [POST]: /faculty
const create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await facultyService.create(name);
    if (!creation.result) {
      res.status(400).send({ message: creation.message });
      return;
    }
    res.status(200).send({ message: creation.message });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /faculty/all
const getAll = async (req, res) => {
  try {
    const result = await facultyService.getAll();
    console.log('result - ', JSON.parse(JSON.stringify(result)));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /faculty/:id
const getById = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const result = await facultyService.getById(facultyId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /faculty
const update = async (req, res) => {
  try {
    const faculty = req.body.faculty;
    if (!faculty.id || !faculty.name) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
      return;
    }
    const update = await facultyService.update(faculty);
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

// [DELETE]: /faculty/:id
const del = async (req, res) => {
  try {
    const facultyId = req.params.id;
    if (isNaN(facultyId)) {
      res.status(400).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    const deletion = await facultyService.del(facultyId);
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

