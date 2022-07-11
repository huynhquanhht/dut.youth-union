'use strict'
const activityClassController = require('../controllers/activity_class');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const fileUtils = require('../utils/file');
const multer = require('multer');
const upload = multer({ storage: fileUtils.fileStorageEngine})
router.post('/', authen.authenticateToken, activityClassController.create);
router.post('/create-by-csv', authen.authenticateToken, upload.single('file'), activityClassController.createByCSV)
router.get('/', authen.authenticateToken, activityClassController.get);
router.get('/:id', authen.authenticateToken, activityClassController.getById);
router.put('/', authen.authenticateToken, activityClassController.update);
router.delete('/:id', authen.authenticateToken, activityClassController.del);

module.exports = router;