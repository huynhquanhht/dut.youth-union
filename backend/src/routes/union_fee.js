'use strict'
const unionFeeController = require('../controllers/union_fee');
const router = require('express').Router();
const authen = require('../middlewares/authentication');


router.get('/', authen.authenticateToken, unionFeeController.get);
router.get('/student', authen.authenticateToken, unionFeeController.getOfStudent);

module.exports = router;
