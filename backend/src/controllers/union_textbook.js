'use strict';
const unionTextbookService = require('../services/union_textbook');
const MESSAGE = require('../utils/message');

// [GET]: /union-textbook
const get = async (req, res) => {
  try {
    let query = req.query;
    let currentUserId = req.payload.userId;
    const result = await unionTextbookService.get(currentUserId, query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

// [PUT]: /union-textbook
const update = async (req, res) => {
  try {
    let unionTextbooks = req.body.unionTextbooks;
    if (!unionTextbooks) {
      res.status(400).send({ message: MESSAGE.EMPTY_DATA_UPDATE });
      return;
    }
    let result = await unionTextbookService.update(unionTextbooks);
    if (result) {
      res.status(200).send({ message: MESSAGE.UPDATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

// [PUT]: /union-textbook/confirm-submission
const confirmSubmission = async (req, res) => {
  try {
    let unionTextbookIds = req.body.unionTextbookIds;
    let currentUserId = req.payload.userId;
    console.log('userId - ', currentUserId);
    if (!unionTextbookIds.length) {
      res.status(400).send({ message: MESSAGE.EMPTY_DATA_CONFIRM });
      return;
    }
    let result = await unionTextbookService.confirmSubmission(currentUserId, unionTextbookIds);
    if (result) {
      res.status(200).send({ message: MESSAGE.CONFIRM_SUCCESS_UNION_TEXTBOOK });
      return;
    }
    res.status(400).send({ message: MESSAGE.CONFIRM_FAIL_UNION_TEXTBOOK });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  get, update, confirmSubmission
};