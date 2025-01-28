const websocket = require("ws");
const EventEmitter = require('events');

const eventBus = new EventEmitter();
const wss = new websocket.Server({ port: 8080 });

console.log("websocket server started");

wss.on("connection", (ws) => {
  ws.send("connected to the client");
 
  ws.on("message", (message) => {
    console.log(message.toString());
    ws.send("Hello welcome");
    
  });

  ws.on("close", () => {
    console.log("connection closed");
  });
});

wss.on("error", () => {
  console.log("error in creating webscoket server");
});

// Listen for newMessage events and broadcast to all clients
eventBus.on('newMessage', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    console.log("sent messages to all users")
  });

  
if(process.argv[2] == "emit"){
    eventBus.emit("newMessage", "Hello By EveryOne")
}