// import the express
const fs = require("fs")
const express = require("express");
const todoRouter = require("./routes/todo.routes");
const blogsRouter = require("./routes/blog.routes");

const app = express();

app.use(express.json())  // body parser, that senses json being sent

app.get("/test", (req,res)=>{
    res.send("This is Test Route")
})
// Todo routes
app.use("/todos", todoRouter)
/// blogs CRUD 
app.use("/blogs", blogsRouter)
    

app.listen(8000, ()=>{
    console.log("Server Started on Port 8000")
});