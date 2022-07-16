'use strict'
const activityClassController = require('../controllers/activity_class');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const fileUtils = require('../utils/file');
const multer = require('multer');
const author = require("../middlewares/authorization");
const upload = multer({ storage: fileUtils.fileStorageEngine})

router.get('/', authen.authenticateToken, author.authorize, activityClassController.get);
router.post('/', authen.authenticateToken, author.authorize, activityClassController.create);
router.post('/create-by-csv', authen.authenticateToken, author.authorize, upload.single('file'), activityClassController.createByCSV)
router.put('/', authen.authenticateToken, author.authorize, activityClassController.update);
router.delete('/:id', authen.authenticateToken, author.authorize, activityClassController.del);
router.get('/:id', authen.authenticateToken, author.authorize, activityClassController.getById);

module.exports = router;