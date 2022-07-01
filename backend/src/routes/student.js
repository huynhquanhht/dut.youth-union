'use strict'
const studentController = require('../controllers/student');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const fileUtils = require('../utils/file');
const multer = require('multer');
const upload = multer({ storage: fileUtils.fileStorageEngine})

router.get('/', authen.authenticateToken, studentController.get);
router.post('/create-by-csv', authen.authenticateToken, upload.single('file'), studentController.createByCSV);
router.delete('/:id', authen.authenticateToken, studentController.deleteStudent);

module.exports = router;