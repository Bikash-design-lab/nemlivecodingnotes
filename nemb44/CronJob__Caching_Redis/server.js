const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
connectToDB(); /// which connects mongodb and nodejs
const app = express();

app.use(express.json());
/// User Routes

app.get("/test", (req,res)=>{
    res.send("hello")
})
app.use("/users", UserRouter);
app.use("/todos", TodoRouter);
/// Handling Undefined Routes
app.use((req,res)=>{
    res.status(404).json({msg:"This request is not found"})
})

app.listen(PORT, ()=>{
    console.log("Server Started", PORT)
})