'use strict'
const functionController = require('../controllers/function');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.post('/', authen.authenticateToken, functionController.create);
router.get('/all', authen.authenticateToken, functionController.getAll);
router.get('/:id', authen.authenticateToken, functionController.getById);
router.put('/', authen.authenticateToken, functionController.update);
router.delete('/:id', authen.authenticateToken, functionController.del);
module.exports = router;