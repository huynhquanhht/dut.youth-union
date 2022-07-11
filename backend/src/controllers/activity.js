'use strict';
const activityService = require('../services/activity');
const MESSAGE = require('../utils/message.js');

const getAll = async (req, res) => {
  try {
    const query = req.query;
    const activityList = await activityService.getAll(query);
    res.status(200).send(activityList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const get = async (req, res) => {
  try {
    const query = req.query;
    console.log('query - ', query);
    const activityList = await activityService.get(query.option);
    res.status(200).send(activityList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getByCurrentStudent = async (req, res) => {
  try {
    const query = req.query;
    const currentUserId = req.payload.userId;
    const activityList = await activityService.getByStudent(query, currentUserId);
    console.log('activityList - ', activityList);
    res.status(200).send(activityList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getPointListOfCurrentStudent = async (req, res) => {
  try {
    const schoolYear = req.query.schoolYear;
    const currentUserId = req.payload.userId;
    const pointList = await activityService.getPointListOfCurrentStudent(currentUserId, schoolYear);
    console.log('pointList -', pointList);
    res.status(200).send(pointList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getById = async (req, res) => {
  try {
    const activityId = req.params.id;
    const userId = req.payload.userId;
    const activity = await activityService.getById(activityId, userId);
    console.log('activity - ', activity);
    res.status(200).send(activity);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const getRegisteredListById = async (req, res) => {
  try {
    const activityId = req.params.id;
    const registeredList = await activityService.getRegisteredList(activityId);
    res.status(200).send(registeredList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const create = async (req, res) => {
  console.log('abc');
  try {
    const newActivity = req.body.newActivity;
    const currentUserId = req.payload.userId;
    if (!newActivity.activityName ||
      !newActivity.beginAt ||
      !newActivity.endAt ||
      !newActivity.beginRegistrationAt ||
      !newActivity.endRegistrationAt ||
      !newActivity.content ||
      !newActivity.coverUrl ||
      !newActivity.place ||
      !newActivity.organizationUnit ||
      !newActivity.participantQuantity ||
      !newActivity.point
    ) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
    }
    console.log('newActivity - ', newActivity);
    const isCreated = await activityService.create(newActivity, currentUserId);
    console.log('isCreated - ', isCreated);
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

const addParticipant = async (req, res) => {
  try {
    const activityId = req.body.activityId;
    const studentId = req.body.studentId;
    const isCreated = await activityService.addParticipant(activityId, studentId);
    if (isCreated) {
      res.status(200).send({ message: MESSAGE.ADD_PARTICIPANT_SUCCESSFULLY });
      return;
    }
    res.status(400).send({ message: MESSAGE.ADD_PARTICIPANT_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const deleteParticipants = async (req, res) => {
  try {
    const registrationIds = req.body.registrationIds;
    console.log('registrationIds - ', registrationIds);
    if (!Array.isArray(registrationIds) || !registrationIds.length) {
      console.log('abc');
      res.status(400).send({ message: MESSAGE.INVALID_DATA });
      return;
    }
    const deletionResult = await activityService.deleteParticipants(registrationIds);
    if (deletionResult) {
      res.status(200).send({
        message:
          MESSAGE.DELETE_SUCCESS + ` (${deletionResult}/${registrationIds.length})`,
      });
      return;
    }
    res.status(400).send({ message: MESSAGE.DELETE_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }

};

const attendParticipants = (req, res) => {
  try {
    const registrationIds = req.body.registrationIds;
    let isUpdated = activityService.attendParticipants(registrationIds);
    if (isUpdated) {
      res.status(200).send({ message: MESSAGE.ATTEND_SUCCESSFULLY});
      return;
    }
    res.status(400).send({ message: MESSAGE.ATTEND_FAIL});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const update = async (req, res) => {
  try {
    console.log('abc');
    const activityId = req.body.activityId;
    const newActivity = req.body.newActivity;
    if (!newActivity.activityName ||
      !newActivity.beginAt ||
      !newActivity.endAt ||
      !newActivity.beginRegistrationAt ||
      !newActivity.endRegistrationAt ||
      !newActivity.content ||
      !newActivity.coverUrl ||
      !newActivity.place ||
      !newActivity.organizationUnit ||
      !newActivity.participantQuantity ||
      !newActivity.point
    ) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
    }
    const isUpdated = await activityService.update(activityId, newActivity);
    if (isUpdated) {
      res.status(200).send({ message: MESSAGE.UPDATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const deleteActivity = async (req, res) => {
  try {
    const activityIds = req.body.activityIds;
    if (!Array.isArray(activityIds) || !activityIds.length) {
      res.status(400).send({ message: MESSAGE.INVALID_DATA });
      return;
    }
    const deletionResult = await activityService.deleteByIds(activityIds);
    res.status(200).send({
      message:
        MESSAGE.DELETE_SUCCESS + ` (${deletionResult}/${activityIds.length})`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const openRegistration = async (req, res) => {
  const activityId = req.params.id;
  const userId = req.payload.userId;
  console.log('userId - ', userId);
  try {
    const activity = await activityService.getById(activityId);
    console.log('created_by - ', activity.created_by);
    if (activity.created_by === userId) {
      const isOpened = await activityService.openRegistration(activityId);
      console.log('isOpened - ', isOpened);
      if (isOpened[0]) {
        res.status(200).send({ message: MESSAGE.OPEN_REGISTRATION_SUCESSFULLY });
        return;
      } else {
        res.status(400).send({ message: MESSAGE.OPEN_REGISTRATION_FAIL });
      }
    }
    res.status(403).send({ message: MESSAGE.NO_PERMISSION });
  } catch (error){
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const closeRegistration = async (req, res) => {
  const activityId = req.params.id;
  const userId = req.payload.userId;
  try {
    const activity = await activityService.getById(activityId);
    if (activity.created_by === userId) {
      const isOpened = await activityService.closeRegistration(activityId);
      if (isOpened[0]) {
        res.status(200).send({ message: MESSAGE.CLOSE_REGISTRATION_SUCESSFULLY });
        return;
      } else {
        res.status(400).send({ message: MESSAGE.CLOSE_REGISTRATION_FAIL });
      }
    }
    res.status(403).send({ message: MESSAGE.NO_PERMISSION });
  } catch (error){
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const register = async (req, res) => {
  const activityId = req.params.id;
  const userId = req.payload.userId;
  try {
    const isRegistered = await activityService.register(activityId, userId);
    if (isRegistered) {
      res.status(200).send({ message: MESSAGE.REGISTER_SUCCESSFULLY});
      return;
    }
    res.status(400).send({ message: MESSAGE.REGISTER_FAIL});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const attend = async (req, res) => {
  const activityId = req.params.id;
  const userId = req.payload.userId;
  try {
    const isAttend = await activityService.attend(activityId, userId);
    if (isAttend) {
      res.status(200).send({ message: MESSAGE.ATTEND_SUCCESSFULLY});
      return;
    }
    res.status(400).send({ message: MESSAGE.ATTEND_FAIL});

  } catch (error) {
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

module.exports = {
  getAll,
  get,
  getByCurrentStudent,
  getPointListOfCurrentStudent,
  getRegisteredListById,
  getById,
  create,
  update,
  deleteActivity,
  openRegistration,
  closeRegistration,
  register,
  attend,
  addParticipant,
  deleteParticipants,
  attendParticipants,
};
