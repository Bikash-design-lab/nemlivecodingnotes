// import the express


const fs = require("fs")
const express = require("express");
const todoRouter = require("./routes/todo.routes");
const blogsRouter = require("./routes/blog.routes");
const loggerMiddleware = require("./middlewares/logger");



const app = express();

app.use(express.json())  // body parser, that senses json being sent
app.use(loggerMiddleware)




app.get("/test", (req,res)=>{
    res.send("This is Test Route")
})

// Todo routes
app.use("/todos", todoRouter)
/// blogs CRUD 
app.use("/blogs", blogsRouter)

/// undefined route handling 
app.use((req,res)=>{
    res.status(404).send("This Request is Not Found")
})
app.listen(8000, ()=>{
    console.log("Server Started on Port 8000")
});