'use strict'
const unionFeeController = require('../controllers/union_fee');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const author = require("../middlewares/authorization");

router.get('/', authen.authenticateToken, author.authorize, unionFeeController.get);
router.get('/student', authen.authenticateToken, author.authorize, unionFeeController.getOfStudent);
router.get('/students', authen.authenticateToken, author.authorize, unionFeeController.getOfStudents);
router.put('/submit', authen.authenticateToken, author.authorize, unionFeeController.submit);
router.put('/confirm-submission', authen.authenticateToken, author.authorize, unionFeeController.confirmSubmission);
router.post('/', authen.authenticateToken, author.authorize, unionFeeController.createUnionFee);
router.get('/invoice', authen.authenticateToken, author.authorize, unionFeeController.getInvoice);
module.exports = router;
