const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server);
app.use(express.static("public")); // mw


let chat_history = {};

/// event
let adminSocket = null;

let clients = new Map();
io.on("connection", (socket) => {
  console.log("connected to the client", `${socket.id}`);

  socket.emit("client_id", socket.id);

  // if client send a message, how we will get that message??
  /// what is the event ??

  socket.on("register", (role) => {
    if (role == "admin") {
      adminSocket = socket;
      console.log("Admin connected");
    } else {
      clients.set(socket.id, socket);
      console.log("client connected", socket.id);
    }
  });

  socket.on("private_message", ({ to, message }) => {
    // console.log(adminSocket)
    if (to == "admin" && adminSocket) {
      adminSocket.emit("message", { from: socket.id, message });
      console.log({ from: socket.id, message });
    } else if (clients.has(to)) {
      // which means that client is present/active
      /// take the client's socket and emit the message
      clients.get(to).emit("message", { from: socket.id, message });
    }
  });

  socket.on("join_room", (room) => {
    // room is coming from frontEnd
    socket.join(room);
    console.log("client joined to the room");
    io.to(room).emit("update_chat_history", chat_history[room]);

  });

  socket.on("room_message", ({ roomNumber, message }) => {
    // io is responsible to manage the rooms
    // store in the object
    if(chat_history[roomNumber]==undefined){
      chat_history[roomNumber] = []
    }else{
      chat_history[roomNumber].push({ from: socket.id, message })
    }
    io.to(roomNumber).emit("update_chat_history", chat_history[roomNumber]);
    console.log({ from: socket.id, message });
  });

  socket.on("disconnect", () => {
    clients.delete(socket.id);
    console.log(socket.id, "disconnected");
  });
});

server.listen(9000, () => {
  console.log("server started");
});
