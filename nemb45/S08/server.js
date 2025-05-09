const express = require("express");
const mongoose = require('mongoose');
const TodoRouter = require("./routes/todo.routes");
const connecToDb = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
const PolicyRouter = require("./routes/policy.routes");
require('dotenv').config()
const app = express();


app.use(express.json())

app.use("/users", UserRouter)
app.use("/todos", TodoRouter)
app.use("/policy", PolicyRouter)

app.listen(8000, ()=>{
    connecToDb(); /// call the function which connects Mongodb to Nodejs 
    console.log("Server Started")
})