const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATBASE_URI);
        console.log("Connection Established With Database");
    } catch (error) {
        console.log(`Error While Connecting With Database ${error}`)
    }
};

module.exports = connectDB;