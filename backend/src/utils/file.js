const multer = require("multer");
const timeUtils = require("./time");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/storage");
  }, filename: (req, file, cb) => {
    cb(null, timeUtils.getCurrentDate() + '-' + file.originalname);
  },
});


module.exports = {
  fileStorageEngine,
};



