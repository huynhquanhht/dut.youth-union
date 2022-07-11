'use strict';
const facultyService = require('../services/faculty');
const MESSAGE = require('../utils/message');

// [POST]: /faculty
const create = async (req, res) => {
  const { id, name, address, email, phone } = req.body;
  if (!name || !id || !address || !email || !phone) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await facultyService.create({ id, name, address, email, phone });
    if (!creation.result) {
      res.status(400).send({ message: creation.message });
      return;
    }
    res.status(200).send({ message: creation.message });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /faculty
const get = async (req, res) => {
  try {
    let query = req.query;
    const result = await facultyService.get(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /faculty/:id
const getById = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const result = await facultyService.getById(facultyId);
    console.log(JSON.parse(JSON.stringify(result)));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /faculty
const update = async (req, res) => {
  try {
    const faculty = req.body.faculty;
    console.log('faculty - ', faculty);
    if (!faculty.id || !faculty.name || !faculty.address || !faculty.email || !faculty.phone) {
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
    console.log(error);
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
  get,
  getById,
  update,
  del
};

