const fileUploadDB = require("./userfileupload.model");

exports.CreateChatFile = async (req, res) => {
    try {
      console.log(req.body)
      const imgFiles = req.files['file'];
      const fileNames = imgFiles.map((file) => file.filename);
      const {
        message
      } = req.body;
      const chatUploadFile = new fileUploadDB({
        message:message,
        file:fileNames
      });
      const savedChatfile = await chatUploadFile.save();
      res.status(201).json({ success: true, data: savedChatfile, error: null });
    } catch (error) {
      console.log(error)
      res.status(500).json({success: false,message: 'Internal Server Error',error: error.message});
    }
};