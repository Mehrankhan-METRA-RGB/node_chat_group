const express = require('express');
const router = express.Router();
const {CreateChatFile, sendMessages} = require('./userfileupload.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        '-' +
        uniqueSuffix +
        '.' +
        file.originalname.split('.').pop()
    );
  },
});

const upload = multer({ storage: storage });
router.use('/chatfileuploads',upload.fields([{ name: 'file' }]));
router.post('/chatfileuploads',CreateChatFile);

module.exports = router;