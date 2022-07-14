'use strict'
const facultyController = require('../controllers/faculty');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const author = require("../middlewares/authorization");

router.post('/', authen.authenticateToken, author.authorize, facultyController.create);
router.get('/', authen.authenticateToken, author.authorize,  facultyController.get);
router.put('/', authen.authenticateToken, author.authorize, facultyController.update);
router.delete('/:id', authen.authenticateToken, author.authorize, facultyController.del);
router.get('/:id', authen.authenticateToken, author.authorize, facultyController.getById);

module.exports = router;