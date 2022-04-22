'use strict';
const courseService = require('../services/course');
const MESSAGE = require('../utils/message');

// [POST]: /course
const create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await courseService.create(name);
    if (!creation.result) {
      res.status(400).send({ message: creation.message });
      return;
    }
    res.status(200).send({ message: creation.message });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /course/all
const getAll = async (req, res) => {
  try {
    const result = await courseService.getAll();
    console.log('result - ', JSON.parse(JSON.stringify(result)));
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /course/:id
const getById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const result = await courseService.getById(courseId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /course
const update = async (req, res) => {
  try {
    const course = req.body.course;
    if (!course.id || !course.name) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
      return;
    }
    const update = await courseService.update(course);
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

// [DELETE]: /course/:id
const del = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (isNaN(courseId)) {
      res.status(400).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    const deletion = await courseService.del(courseId);
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

