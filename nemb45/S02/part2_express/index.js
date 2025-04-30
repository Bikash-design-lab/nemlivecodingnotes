const express = require('express');  // import
const fs = require("fs")
const app = express(); /// call the express fn, which inturn provides methods to get request and give the response

// app is responsible to get req and send res

/// Let us create an first req-res cycle
/// Get Route
app.get("/home", (req,res)=>{
    /// send as simple response
    res.send("This is first response sent through express")
})

app.get("/aboutus", (req,res)=>{
    res.send("This is about us page")
})

app.get("/read", (req,res)=>{
    let data = fs.readFileSync("./index.js", "utf-8");
    res.send(data)
})

app.get("/random", (req,res)=>{
    let num = Math.random();
    res.send(`The random number is ${num}`)
})
/// Starting a server with an particular port/window that is 8080
app.listen(8080, ()=>{
    console.log("server started")
})
