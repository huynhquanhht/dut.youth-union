'use strict'
const courseController = require('../controllers/course');
const router = require('express').Router();

router.post('/', courseController.create);
router.get('/all', courseController.getAll);
router.get('/:id', courseController.getById);
router.put('/', courseController.update);
router.delete('/:id', courseController.del);

module.exports = router;