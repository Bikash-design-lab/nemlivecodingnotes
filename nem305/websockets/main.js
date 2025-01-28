const EventEmitter = require("events");

const myEmitter = new EventEmitter();

function firstListener() {
  console.log("Helloooo! first listener");
}
myEmitter.on("event", firstListener);

myEmitter.on("secondEvent", function secondListener() {
  console.log("Helloooo! it is second event");
});

myEmitter.once("onceEvent", function secondListener() {
  console.log("Helloooo! once event");
});

myEmitter.emit("onceEvent");
myEmitter.emit("onceEvent");
myEmitter.emit("onceEvent");
