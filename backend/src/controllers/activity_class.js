'use strict';
const activityClassService = require('../services/activity_class');
const MESSAGE = require('../utils/message');
const {parse} = require('csv-parse');
const fs = require('fs');
const timeUtils = require("../utils/time");

// [POST]: /activity-class
const create = async (req, res) => {
  const activityClass = req.body.activityClass;
  if (!activityClass.name || !activityClass.id || !activityClass.faculty_id || !activityClass.course_id) {
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    return;
  }
  try {
    const creation = await activityClassService.create(activityClass);
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

// [GET]: /activity-class
const get = async (req, res) => {
  try {
    let query = req.query;
    let userId = req.payload.userId;
    let result = await activityClassService.get(query, userId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [GET]: /activity-class/:id
const getById = async (req, res) => {
  try {
    const activityClassId = req.params.id;
    const result = await activityClassService.getById(activityClassId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR});
  }
}

// [PUT]: /activity-class
const update = async (req, res) => {
  try {
    const activityClass = req.body.activityClass;
    if (!activityClass.name || !activityClass.id || !activityClass.faculty_id || !activityClass.course_id) {
      res.status(400).send({ message: MESSAGE.CREATE_FAIL });
      return;
    }
    const update = await activityClassService.update(activityClass);
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

// [DELETE]: /activity-class/:id
const del = async (req, res) => {
  try {
    const activityClassId = req.params.id;
    console.log('activityClassId - ', activityClassId);
    if (!activityClassId) {
      console.log('a');
      res.status(400).send({ message: MESSAGE.DELETE_FAIL });
      return;
    }
    const deletion = await activityClassService.del(activityClassId);
    if (deletion.result) {
      res.status(200).send({ message: deletion.message });
      return;
    }
    res.status(400).send({ message: deletion.message });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const createByCSV = async (req, res) => {
  try {
    const file = req.file;
    const activityClasses = [];
    await fs.createReadStream(`E:/s-union/code/s-union/backend/src/storage/${timeUtils.getCurrentDate() + '-' + file.originalname}`)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        const activityClass = {
          id: row[0],
          name: row[0],
          faculty_id: row[1],
          course_id:row[2],
        };
        activityClasses.push(activityClass);
      })
      .on('end', async function() {
        try {
          const isCreated = await activityClassService.createMany(activityClasses);
          if (isCreated) {
            res.status(200).send({ message: MESSAGE.CREATE_SUCCESS });
            return;
          }
          res.status(400).send({ message: MESSAGE.CREATE_FAIL });
          return;
        } catch (error) {
          res.status(500).send({ message: MESSAGE.SERVER_ERROR });
        }
      });
  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  create,
  get,
  getById,
  update,
  del,
  createByCSV
};

