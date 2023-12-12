const mongoose = require("mongoose");


const fileUploaderSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    // file:[{
    //     type:String,
    //     default:null,
    // }]
},{timestamps:true})


module.exports = mongoose.model('ChatFileUpload', fileUploaderSchema);