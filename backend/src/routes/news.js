'use strict'
const newsController = require('../controllers/news');
const router = require('express').Router();
const authen = require('../middlewares/authentication');

router.get('/', newsController.get);
router.post('/', authen.authenticateToken, newsController.create);
router.put('/', authen.authenticateToken, newsController.update);
router.delete('/', authen.authenticateToken, newsController.deleteByIds);
router.get('/:id', authen.authenticateToken, newsController.getById);

module.exports = router;