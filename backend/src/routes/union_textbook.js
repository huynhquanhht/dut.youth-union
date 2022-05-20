'use strict'
const unionTextbook = require('../controllers/union_textbook');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.get('/', authen.authenticateToken, unionTextbook.get);
router.put('/', authen.authenticateToken, unionTextbook.update);
router.put('/confirm-submission', authen.authenticateToken, unionTextbook.confirmSubmission);
module.exports = router;