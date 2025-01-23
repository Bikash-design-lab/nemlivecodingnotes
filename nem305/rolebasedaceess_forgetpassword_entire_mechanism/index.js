const express = require("express");
const connectToDb = require("./config");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.send("This is Test Route")
})

app.use("/users", UserRouter);
app.use("/todos", TodoRouter)
app.listen(8080, async ()=>{
    await connectToDb()
    console.log("Server started")
})