const express = require('express');
const router = express.Router();
const {CreateChatFile} = require('./userfileupload.controller.js');
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
router.use('/sendmessage',upload.fields([{ name: 'file' }]));
router.post('/sendmessage',CreateChatFile);

module.exports = router;