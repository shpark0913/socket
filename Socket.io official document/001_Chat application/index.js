// const express = require("express");
// const app = express();

// const http = require("http");
// const server = http.createServer(app);

///////////////////////////////////////////

// The web framework

// app.get("/", (req, res) => {
//   res.send("<h1>Hello, world!</h1>");
// });

// server.listen(3000, () => {
//   console.log("Listening on *:3000");
// });

///////////////////////////////////////////

// Serving HTML

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// server.listen(3000, () => {
//   console.log("Listening on *:3000");
// });

///////////////////////////////////////////

// Integrating Socket.IO

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// const app = express();
// const server = createServer(app);
// const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("chat message", (msg) => console.log("message : " + msg));
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// Broadcasting

///////////////////////////////////////////

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
