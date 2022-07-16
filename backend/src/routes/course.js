'use strict'
const courseController = require('../controllers/course');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const author = require("../middlewares/authorization");

router.post('/',  authen.authenticateToken, courseController.create);
router.get('/all', authen.authenticateToken, courseController.getAll);
router.get('/:id', authen.authenticateToken, courseController.getById);
router.put('/', authen.authenticateToken, courseController.update);
router.delete('/:id', authen.authenticateToken, courseController.del);

module.exports = router;