const express = require('express');
const sharp = require('sharp');
const fileUploadDB = require("./userfileupload.model");

exports.CreateChatFile = async (req, res) => {
    try {
      const imgFiles = req.files['file'];
      const compressedFileNames = [];
      for (const file of imgFiles) {
        let compressedFileName = file.filename;
        if (file.mimetype.startsWith('image/')) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          compressedFileName = `compressed-${uniqueSuffix}.jpg`;
          const compressedFilePath = `public/uploads/${compressedFileName}`;
          try {
            const imageBuffer = await sharp(file.path)
              .resize({ width: 800 })
              .toBuffer();
            await sharp(imageBuffer).toFile(compressedFilePath);
          } catch (sharpError) {
            console.error('Sharp error:', sharpError);
            compressedFileName = file.filename;
          }
        }
        compressedFileNames.push(compressedFileName);
      }
      const { message } = req.body;
      const chatUploadFile = new fileUploadDB({
        message: message,
        file: compressedFileNames,
      });
      const savedChatfile = await chatUploadFile.save();
      res.status(201).json({ success: true, data: savedChatfile, error: null });
    } catch (error) {
      console.error('General error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  };  