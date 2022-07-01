'use strict'
const groupFunctionController = require('../controllers/group_function');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.post('/', authen.authenticateToken, groupFunctionController.create);
router.get('/all', authen.authenticateToken, groupFunctionController.getAll);
router.get('/:id', authen.authenticateToken, groupFunctionController.getById);
router.put('/', authen.authenticateToken, groupFunctionController.update);
router.delete('/:id', authen.authenticateToken, groupFunctionController.del);
module.exports = router;