'use strict'
const activityController = require('../controllers/activity');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.get('/', authen.authenticateToken, activityController.get);
router.get('/all', authen.authenticateToken, activityController.getAll);
router.get('/student', authen.authenticateToken, activityController.getByCurrentStudent);
router.post('/', authen.authenticateToken, activityController.create);
router.put('/', authen.authenticateToken, activityController.update);
router.delete('/', authen.authenticateToken, activityController.deleteActivity);
router.get('/:id', authen.authenticateToken, activityController.getById);
module.exports = router;