const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo.routes");
const app = express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Welcome to Home Page")
})

app.use("/todos", todoRouter)
//mongodb://127.0.0.1:27017/
app.listen(8080, async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/nem305")
        console.log("Connected to DB")
    }catch(err){
        console.log("Failed to connect DB")
    }
    console.log("server started")
})