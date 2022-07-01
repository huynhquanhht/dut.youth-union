'use strict'
const permissionController = require('../controllers/permisson');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.post('/', authen.authenticateToken, permissionController.create);
router.get('/all', authen.authenticateToken, permissionController.getAll);
router.get('/:id', authen.authenticateToken, permissionController.getById);
router.put('/', authen.authenticateToken, permissionController.update);
router.delete('/:id', authen.authenticateToken, permissionController.del);

module.exports = router;