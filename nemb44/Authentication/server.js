const express = require("express");
const connecToDB = require("./configs/mongo.config");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");

const app = express();
connecToDB()
app.use(express.json());


app.get("/test", (req,res)=>{
    res.status(200).json({msg:"This is test route"})
})
app.use("/users", UserRouter);
app.use("/todos", TodoRouter)
// 
app.use((req,res)=>{
    res.status(404).json({msg:"This route is not defined"})
})
app.listen(8000, ()=>{
    console.log("Server Started")
})