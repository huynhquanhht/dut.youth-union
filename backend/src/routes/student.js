'use strict'
const studentController = require('../controllers/student');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const fileUtils = require('../utils/file');
const multer = require('multer');
const upload = multer({ storage: fileUtils.fileStorageEngine})

router.get('/', authen.authenticateToken, studentController.get);
router.post('/', authen.authenticateToken, studentController.create);
router.put('/', authen.authenticateToken, studentController.update);
router.get('/:id', authen.authenticateToken, studentController.getById)
router.post('/create-by-csv', authen.authenticateToken, upload.single('file'), studentController.createByCSV);
router.delete('/:id', authen.authenticateToken, studentController.deleteStudent);

module.exports = router;