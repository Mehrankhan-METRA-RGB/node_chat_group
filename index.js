const express = require("express");
const path = require('path');
const app = express();
const ConnectionDB = require("./models/connectionDB");
const chatfileuploads = require('./controllers/usersFileupload/userfileupload.routes');
const Port = process.env.PORT || 8000


ConnectionDB();
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1/uploads",chatfileuploads)


app.listen(Port,
    console.log(`Server Running On Port ${Port}`)
)