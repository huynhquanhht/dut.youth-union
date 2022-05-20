'use strict'
const roleController = require('../controllers/role');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.post('/', authen.authenticateToken, roleController.create);
router.get('/all', authen.authenticateToken, roleController.getAll);
router.get('/:id', authen.authenticateToken, roleController.getById);
router.put('/', authen.authenticateToken, roleController.update);
router.delete('/:id', authen.authenticateToken, roleController.del);

module.exports = router;