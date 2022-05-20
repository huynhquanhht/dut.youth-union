'use strict'
const studentController = require('../controllers/student');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.get('/', authen.authenticateToken, studentController.get);

module.exports = router;