require("dotenv").config()
const cors = require("cors")
const express = require("express");
const connectToDB = require("./config/db.config");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
const PORT = process.env.PORT;
const app = express();
app.use(cors())
app.use(express.json());

app.get("/test", (req,res)=>{
    res.status(200).json({msg:"This is test route"})
})

// user routes
app.use("/users", UserRouter);
/// todo routes
app.use("/todos", TodoRouter)
/// handling undefined routes
app.use((req,res)=>{
    res.status(404).json({msg:"This request is not found...."})
})
app.listen( PORT, ()=>{
    connectToDB()
    console.log("Server started on the port", PORT)
})