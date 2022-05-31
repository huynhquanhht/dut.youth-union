'use strict'
const activityController = require('../controllers/activity');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.get('/', authen.authenticateToken, activityController.get);
router.get('/all', authen.authenticateToken, activityController.getAll);
router.get('/student', authen.authenticateToken, activityController.getByCurrentStudent);

module.exports = router;