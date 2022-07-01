'use strict'
const facultyController = require('../controllers/faculty');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.post('/', authen.authenticateToken, facultyController.create);
router.get('/', authen.authenticateToken, facultyController.get);
router.put('/', authen.authenticateToken, facultyController.update);
router.delete('/:id', authen.authenticateToken, facultyController.del);
router.get('/:id', authen.authenticateToken, facultyController.getById);

module.exports = router;