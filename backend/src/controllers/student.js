'use strict';
const studentService = require('../services/student');
const MESSAGE = require('../utils/message');
const fs = require("fs");
const timeUtils = require("../utils/time");
const {parse} = require("csv-parse");
const bcrypt = require("bcrypt");

// [GET]: /student
const get = async (req, res) => {
  try {
    let query = req.query;
    let userId = req.payload.userId;
    const result = await studentService.get(query, userId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
};

// [POST]: /student/create-by-csv
const createByCSV = async (req, res) => {
  try {
    const file = req.file;
    const isCreated = await studentService.createMany(file);
    if (isCreated) {
      console.log('isCreated a- ', isCreated);
      res.status(200).send({message: MESSAGE.CREATE_SUCCESS});
      return;
    }
    res.status(400).send({message: MESSAGE.CREATE_FAIL});
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [DELETE]: /student/:id
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const isDeleted = await studentService.deleteStudent(studentId);
    console.log('isDeleted - ', isDeleted);
    if (isDeleted) {
      res.status(200).send({ message: MESSAGE.DELETE_SUCCESS });
      return;
    }
    res.status(400).send({message: MESSAGE.DELETE_FAIL});
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}


module.exports = {
  get,
  createByCSV,
  deleteStudent,
};