const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
var http = require('http');
var socketIO = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
const path = require('path');
const ConnectionDB = require("./models/connectionDB");
const chatmsgroute = require("./controllers/usersFileupload/userfileupload.routes")
const Port = process.env.PORT;

ConnectionDB();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use("/api/v1/chatmessagesend",chatmsgroute)

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('fileUploaded', (data) => {
    io.emit("data", data);
    console.log('Received file upload:', data);
  });

  socket.on('sendMessage', (message) => {
    io.emit("message", message);
    console.log('Received message:', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
});