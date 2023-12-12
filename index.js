const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');
const ConnectionDB = require("./models/connectionDB");
const chatfileuploads = require('./controllers/usersFileupload/userfileupload.routes');
const Port = process.env.PORT;

ConnectionDB();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use("/api/v1/uploads",chatfileuploads)

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('sendMessage', (message) => {
      console.log(message)
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
  
});

  server.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });