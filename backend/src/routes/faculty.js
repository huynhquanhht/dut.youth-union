'use strict'
const facultyController = require('../controllers/faculty');
const router = require('express').Router();

router.post('/', facultyController.create);
router.get('/all', facultyController.getAll);
router.get('/:id', facultyController.getById);
router.put('/', facultyController.update);
router.delete('/:id', facultyController.del);

module.exports = router;