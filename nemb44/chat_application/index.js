const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app); // linking the express server to http
const io = new Server(server); /// creates a socket

app.use(express.static("public"));
/// I will create a socket which connects the clienst
const onlineUsers = new Map(); // userName → socket.id
let chatsArray = [];

// event called connection
/// Event listener
io.on("connection", (socket) => {
  ///socket is individual client
  console.log("User connected:", socket.id);
  /// once connection established
  /// i need to reagister the user from FE
  // register is an event
  socket.on("register", (userName) => {
    onlineUsers.set(userName, socket.id);
    console.log("User Registered with", userName, socket.id);
    socket.emit("onlineUsers", Array.from(onlineUsers.entries()))
    socket.emit("chatHistory", chatsArray)

  });
// socket emits chatArray
  socket.on("sendMessage", ({fromUserName,toSenderName,sendMessageText})=>{
    //console.log({fromUserName,toSenderName,sendMessageText})
    chatsArray.push({fromUserName,toSenderName,sendMessageText});
   // console.log(chatsArray)
    /// when chat is pushed into chatArray
    /// emit an event chatHistory, that gives updated chatArray to FE
    //socket.emit("chatHistory", chatsArray)
    /// This new message should be sent to both users
    /// how it can be done??
    /// appending to opposite user
    let toSocketId = onlineUsers.get(toSenderName);
    io.to(toSocketId).emit("newMessage",{fromUserName,toSenderName,sendMessageText})
   /// appending myself
    socket.emit("newMessage",{fromUserName,toSenderName,sendMessageText})
  })
 // socket.emit("chatHistory", chatsArray)
  /// Disconnect
  socket.on("disconnect", () => {
    for (let [userName, socketId] of onlineUsers) {
      // console.log(userName, socketId)
      /// socketId coming from Map
      /// socket.id coming from frontend
      /// remove the client from map
      if (socketId == socket.id) {
        onlineUsers.delete(userName);
      }
      console.log(`User with socketId ${socket.id} & name ${userName} got disconnected`);
    }
    // console.log(onlineUsers)
  });
});

server.listen(3000, () => {
  console.log("server started");
});
