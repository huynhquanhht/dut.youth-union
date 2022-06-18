'use strict'
const userController = require('../controllers/user');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const author = require('../middlewares/authorization');

router.get('/', authen.authenticateToken, author.authorize, userController.get);
router.post('/login', userController.login);
router.get('/current-user-profile', authen.authenticateToken, userController.getCurrentUserProfile);
router.get('/:id', authen.authenticateToken, userController.getById);

module.exports = router;