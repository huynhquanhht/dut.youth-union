'use strict'
const activityController = require('../controllers/activity');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const {authenticateToken} = require("../middlewares/authentication");

router.get('/', authen.authenticateToken, activityController.get);
router.get('/all', authen.authenticateToken, activityController.getAll);
router.get('/student', authen.authenticateToken, activityController.getByCurrentStudent);
router.get('/student/point-list', authen.authenticateToken, activityController.getPointListOfCurrentStudent);
router.post('/', authen.authenticateToken, activityController.create);
router.put('/', authen.authenticateToken, activityController.update);
router.put('/open-registration/:id', authenticateToken, activityController.openRegistration);
router.put('/close-registration/:id', authenticateToken, activityController.closeRegistration);
router.delete('/', authen.authenticateToken, activityController.deleteActivity);
router.get('/registered-list/:id', authen.authenticateToken, activityController.getRegisteredListById);
router.post('/register/:id', authen.authenticateToken, activityController.register);
router.put('/attend/:id', authen.authenticateToken, activityController.attend);
router.get('/:id', authen.authenticateToken, activityController.getById);
router.post('/add-participant', authen.authenticateToken, activityController.addParticipant);
router.put('/attend-participants', authen.authenticateToken, activityController.attendParticipants);
router.delete('/delete-participants', authen.authenticateToken, activityController.deleteParticipants);
module.exports = router;