'use strict'
const lectureController = require('../controllers/lecture');
const router = require('express').Router();

router.post('/', lectureController.create);
router.get('/all', lectureController.getAll);
router.get('/:id', lectureController.getById);
router.put('/', lectureController.update);
router.delete('/:id', lectureController.del);

module.exports = router;