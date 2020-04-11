const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();

const server = app.listen(5000, () => {
  console.log("server listen on port 5000...");
});

// static files
app.use(express.static("public"));

// Socket setup

const io = socket(server);

// on connection waiting event from the browser
// each one have owen socket
io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
