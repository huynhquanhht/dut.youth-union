'use strict'
const studentController = require('../controllers/student');
const router = require('express').Router();
const authen = require('../middlewares/authentication');
const fileUtils = require('../utils/file');
const multer = require('multer');
const author = require("../middlewares/authorization");
const upload = multer({ storage: fileUtils.fileStorageEngine})

router.get('/', authen.authenticateToken, author.authorize, studentController.get);
router.post('/', authen.authenticateToken, author.authorize, studentController.create);
router.put('/', authen.authenticateToken, author.authorize, studentController.update);
router.get('/:id', authen.authenticateToken, author.authorize, studentController.getById)
router.post('/create-by-csv', authen.authenticateToken, author.authorize, upload.single('file'), studentController.createByCSV);
router.delete('/:id', authen.authenticateToken, author.authorize, studentController.deleteStudent);

module.exports = router;