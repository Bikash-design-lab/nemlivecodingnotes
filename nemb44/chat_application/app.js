const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// Define an event listener
myEmitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
  });
  
  // Emit the event
  myEmitter.emit("greet", "Alice");


  /// event listner
  myEmitter.on("bye", (name1, name2)=>{
    console.log("By Bye.....", name1, name2)
  })

setTimeout(()=>{
    myEmitter.emit("bye", "Pratik", "Ankith")
},5000)
