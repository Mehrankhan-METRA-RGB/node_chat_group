const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nodechatgroup");
        console.log("Connection Established With Database");
    } catch (error) {
        console.log(`Error While Connecting With Database ${error}`)
    }
};

module.exports = connectDB;