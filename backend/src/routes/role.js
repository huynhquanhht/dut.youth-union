'use strict'
const roleController = require('../controllers/role');
const router = require('express').Router();

router.post('/', roleController.create);
router.get('/all', roleController.getAll);
router.get('/:id', roleController.getById);
router.put('/', roleController.update);
router.delete('/:id', roleController.del);

module.exports = router;