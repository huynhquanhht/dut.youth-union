'use strict'
const activityController = require('../controllers/activity');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const {authenticateToken} = require("../middlewares/authentication");
const author = require("../middlewares/authorization");

router.get('/', authen.authenticateToken, author.authorize, activityController.get);
router.get('/all', authen.authenticateToken, activityController.getAll);
router.get('/student', authen.authenticateToken, activityController.getByCurrentStudent);
router.get('/student/point-list', authen.authenticateToken, author.authorize, activityController.getPointListOfCurrentStudent);
router.post('/', authen.authenticateToken, author.authorize, activityController.create);
router.put('/', authen.authenticateToken, author.authorize, activityController.update);
router.put('/open-registration/:id', authenticateToken, activityController.openRegistration);
router.put('/close-registration/:id', authenticateToken, activityController.closeRegistration);
router.delete('/', authen.authenticateToken, author.authorize, activityController.deleteActivity);
router.get('/registered-list/:id', authen.authenticateToken, author.authorize, activityController.getRegisteredListById);
router.post('/register/:id', authen.authenticateToken, author.authorize, activityController.register);
router.post('/add-participant', authen.authenticateToken, author.authorize, activityController.addParticipant);
router.put('/attend-participants', authen.authenticateToken, author.authorize,  activityController.attendParticipants);
router.delete('/delete-participants', authen.authenticateToken, author.authorize, activityController.deleteParticipants);
router.put('/attend/:id', authen.authenticateToken, activityController.attend);
router.get('/:id', authen.authenticateToken, author.authorize, activityController.getById);

module.exports = router;