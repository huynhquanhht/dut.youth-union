'use strict'
const functionController = require('../controllers/function');
const router = require('express').Router();

router.post('/', functionController.create);
router.get('/all', functionController.getAll);
router.get('/:id', functionController.getById);
router.put('/', functionController.update);
router.delete('/:id', functionController.del);
module.exports = router;