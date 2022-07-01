'use strict'
const registerJoinController = require('../controllers/register_join');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.get('/', authen.authenticateToken, registerJoinController.get);
router.post('/', authen.authenticateToken, registerJoinController.create);
router.put('/', authen.authenticateToken, registerJoinController.update);
router.delete('/:id', authen.authenticateToken, registerJoinController.deleteActivity);
router.get('/:id', authen.authenticateToken, registerJoinController.getById);
module.exports = router;