'use strict'
const unionTextbook = require('../controllers/union_textbook');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const author = require("../middlewares/authorization");

router.get('/', authen.authenticateToken, author.authorize, unionTextbook.get);
router.put('/', authen.authenticateToken, author.authorize, unionTextbook.update);
router.put('/confirm-submission', authen.authenticateToken, author.authorize, unionTextbook.confirmSubmission);
module.exports = router;