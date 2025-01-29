### **Socket.IO Events & Functions**  

Socket.IO provides both **client-side** and **server-side** events and functions. Below is a categorized list of commonly used ones:

---

## **1. Server-Side (Node.js)**
These are the events and functions available on the **Socket.IO server (Node.js)**.

### **1.1 Server Functions**
| Function | Description |
|----------|------------|
| `const io = new Server(server, options)` | Creates a new Socket.IO server instance. |
| `io.on('connection', callback)` | Listens for incoming client connections. |
| `io.emit(event, data)` | Sends a message to all connected clients. |
| `io.to(room).emit(event, data)` | Sends a message to all clients in a specific room. |
| `io.sockets.sockets.get(socketId)` | Retrieves a specific socket by its ID. |
| `io.use(middleware)` | Adds middleware to process socket connections. |

---

### **1.2 Server Events**
| Event | Description |
|-------|------------|
| `'connection'` | Fired when a client connects. |
| `'disconnect'` | Fired when a client disconnects. |
| `'disconnecting'` | Triggered just before a client disconnects. |
| `'error'` | Fires when an error occurs. |
| `'message'` | Built-in event to send messages. |
| `'connect_timeout'` | Fired when a connection attempt times out. |
| `'ping'` | Sent to test the connection latency. |
| `'pong'` | Response to a ping event. |

---

### **1.3 Server Socket Functions**
| Function | Description |
|----------|------------|
| `socket.emit(event, data)` | Sends a message to the connected client. |
| `socket.on(event, callback)` | Listens for a specific event from the client. |
| `socket.broadcast.emit(event, data)` | Sends a message to all clients **except the sender**. |
| `socket.join(room)` | Adds the client to a specific room. |
| `socket.leave(room)` | Removes the client from a room. |
| `socket.to(room).emit(event, data)` | Sends a message to all clients in a room **except the sender**. |
| `socket.id` | Retrieves the unique ID of a socket. |
| `socket.rooms` | Returns an array of rooms the client has joined. |
| `socket.disconnect()` | Disconnects the client. |

---

## **2. Client-Side (Browser, React, etc.)**
These are the events and functions available on the **Socket.IO client**.

### **2.1 Client Functions**
| Function | Description |
|----------|------------|
| `const socket = io(url, options)` | Creates a new client socket connection. |
| `socket.emit(event, data)` | Sends a message to the server. |
| `socket.on(event, callback)` | Listens for a message from the server. |
| `socket.disconnect()` | Manually disconnects from the server. |
| `socket.connect()` | Reconnects to the server. |
| `socket.id` | Retrieves the unique socket ID. |

---

### **2.2 Client Events**
| Event | Description |
|-------|------------|
| `'connect'` | Fires when the client connects to the server. |
| `'disconnect'` | Fires when the client disconnects. |
| `'connect_error'` | Fired when a connection error occurs. |
| `'connect_timeout'` | Fired when a connection attempt times out. |
| `'reconnect'` | Fired when a reconnection attempt is successful. |
| `'reconnect_attempt'` | Fires when a reconnection attempt is made. |
| `'reconnect_error'` | Fires when a reconnection attempt fails. |
| `'reconnect_failed'` | Fires when reconnection attempts stop. |
| `'error'` | Fires when an error occurs. |
| `'message'` | Built-in event to receive messages from the server. |

---

## **3. Room and Namespace Events**
### **3.1 Room Events**
Rooms allow messages to be sent to a group of sockets.

| Function | Description |
|----------|------------|
| `socket.join(room)` | Adds a socket to a room. |
| `socket.leave(room)` | Removes a socket from a room. |
| `io.to(room).emit(event, data)` | Emits an event to all sockets in a room. |
| `socket.to(room).emit(event, data)` | Sends a message to all clients in a room **except the sender**. |
| `io.sockets.adapter.rooms` | Returns a list of all rooms. |

---

### **3.2 Namespace Events**
Namespaces allow multiple, separate connections under the same server.

| Function | Description |
|----------|------------|
| `const nsp = io.of('/namespace')` | Creates a namespace. |
| `nsp.on('connection', callback)` | Listens for connections in the namespace. |
| `nsp.emit(event, data)` | Sends a message to all clients in the namespace. |
| `nsp.to(room).emit(event, data)` | Sends a message to all clients in a room within the namespace. |

---

## **4. Middleware & Authentication**
| Function | Description |
|----------|------------|
| `io.use((socket, next) => { ... })` | Middleware function to authenticate connections. |
| `socket.handshake` | Accesses connection details like headers & query params. |
| `socket.use((packet, next) => { ... })` | Middleware for processing client messages. |

---

### **5. Advanced Functions**
| Function | Description |
|----------|------------|
| `socket.compress(false).emit(event, data)` | Disables compression for a message. |
| `io.engine.generateId = () => customId;` | Customizes the socket ID generation. |
| `io.sockets.sockets.forEach(socket => { ... })` | Iterates over all connected sockets. |
| `socket.binary(true).emit(event, data)` | Sends binary data. |

---

### **6. Debugging & Logs**
| Function | Description |
|----------|------------|
| `DEBUG=socket.io* node app.js` | Enables debug mode to log Socket.IO events. |
| `socket.io.engine.clientsCount` | Retrieves the number of connected clients. |

---

### **Conclusion**
Socket.IO provides powerful real-time communication capabilities with a variety of functions and events. You can handle different scenarios, such as broadcasting, room management, namespaces, and authentication, with ease.

