'use strict'
const lectureController = require('../controllers/lecture');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.post('/', authen.authenticateToken, lectureController.create);
router.get('/all', authen.authenticateToken, lectureController.getAll);
router.get('/:id', authen.authenticateToken, lectureController.getById);
router.put('/', authen.authenticateToken, lectureController.update);
router.delete('/:id', authen.authenticateToken, lectureController.del);

module.exports = router;