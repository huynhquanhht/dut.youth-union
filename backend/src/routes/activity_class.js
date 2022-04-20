'use strict'
const activityClassController = require('../controllers/activity_class');
const router = require('express').Router();

router.post('/', activityClassController.create);
router.get('/all', activityClassController.getAll);
router.get('/:id', activityClassController.getById);
router.put('/', activityClassController.update);
router.delete('/:id', activityClassController.del);

module.exports = router;