// Server
import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
    // client에 message 보내기
    socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

    // client의 message 받기
    socket.on("hello from client", (...args) => {
        // ...
    })
})

// Client
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

// server에 message 보내기
socket.emit("hello from client", 5, "6");

// server의 message 받기
socket.on("hello from server", (...args) => {
    // ...
})