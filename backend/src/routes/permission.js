'use strict'
const permissionController = require('../controllers/permisson');
const router = require('express').Router();

router.post('/', permissionController.create);
router.get('/all', permissionController.getAll);
router.get('/:id', permissionController.getById);
router.put('/', permissionController.update);
router.delete('/:id', permissionController.del);

module.exports = router;