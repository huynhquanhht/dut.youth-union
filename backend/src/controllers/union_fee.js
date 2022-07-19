'use strict'
const unionFeeService = require('../services/union_fee');
const MESSAGE = require('../utils/message');
const models = require("../models");
const userRepo = require("../repositories/user");
const roleUtils = require("../utils/role");
const unionTextbookRepo = require("../repositories/union_textbook");
const timeUtils = require("../utils/time");
const unionTextbookService = require("../services/union_textbook");

// [GET]: /union-fee
const get = async (req, res) => {
  try {
    let query = req.query;
    let currentUserId = req.payload.userId;
    const result = await unionFeeService.get(currentUserId, query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

// [GET]: /union-fee/student
const getOfStudent = async (req, res) => {
  try {
    let query = req.query;

    let currentUserId = req.payload.userId;
    const result = await unionFeeService.getOfStudent(currentUserId, query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

// [GET]: /union-fee/students
const getOfStudents = async (req, res) => {
  try {
    let query = req.query;
    let currentUserId = req.payload.userId;
    const result = await unionFeeService.getOfStudents(currentUserId, query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

// [PUT]: /union-fee/submit
const submit = async (req, res) => {
  try {
    let unionFees = req.body.unionFees;
    if (!unionFees) {
      res.status(400).send({ message: MESSAGE.EMPTY_DATA_UPDATE });
      return;
    }
    let result = await unionFeeService.submit(unionFees);
    if (result) {
      res.status(200).send({ message: MESSAGE.UPDATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

// [PUT]: /union-fee/confirm-submission
const confirmSubmission = async (req, res) => {
  try {
    let submitUnionFeeIds = req.body.submitUnionFeeIds;
    let currentUserId = req.payload.userId;
    if (!submitUnionFeeIds.length) {
      res.status(400).send({ message: MESSAGE.EMPTY_DATA_CONFIRM });
      return;
    }
    let result = await unionFeeService.confirmSubmission(currentUserId, submitUnionFeeIds);
    if (result) {
      res.status(200).send({ message: MESSAGE.CONFIRM_SUCCESS_UNION_FEE });
      return;
    }
    res.status(400).send({ message: MESSAGE.CONFIRM_FAIL_UNION_FEE });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

// [POST]: /union-fee
const createUnionFee = async (req, res) => {
  try {
    const unionFee = req.body.unionFee;
    console.log('unionFee - ', unionFee);
    if (!unionFee.schoolYear || !unionFee.amountOfMoney) {
      res.status(400).send({ message: MESSAGE.CREATE_FAIL });
      return;
    }
    let isCreated = await unionFeeService.create(unionFee);
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

// [GET]: /union-fee/invoice
const getInvoice = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    const unionFeeId = req.query.unionFeeId;
    let invoiceInfo = await unionFeeService.getInvoice(studentId, unionFeeId);
    res.status(200).send(invoiceInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  get, getOfStudent, getOfStudents, submit, confirmSubmission, createUnionFee, getInvoice
};