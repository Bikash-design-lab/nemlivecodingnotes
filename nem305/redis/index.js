const express = require("express");
const connectToDb = require("./config/db");
const TodoRouter = require("./route/todos.routes");

const app = express();
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("this is test route")
})
app.use("/todos", TodoRouter);

app.listen(9000, ()=>{
    connectToDb()
    console.log("server started")
})