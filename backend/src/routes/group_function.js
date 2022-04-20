'use strict'
const groupFunctionController = require('../controllers/group_function');
const router = require('express').Router();

router.post('/', groupFunctionController.create);
router.get('/all', groupFunctionController.getAll);
router.get('/:id', groupFunctionController.getById);
router.put('/', groupFunctionController.update);
router.delete('/:id', groupFunctionController.del);
module.exports = router;