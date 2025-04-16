const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const TodoModel = require("../models/todo.model");
const TodoRouter = express.Router();
const Redis = require("ioredis");
var cron = require('node-cron');

/// connecting redis db with nodejs
const redis = new Redis();
cron.schedule('* * * * *', async () => {
    let todoToDeeleted = await redis.get("todos_to_be_deleted");
    ///console.log(JSON.parse(todoToDeeleted))
    // please update to Many user can delete many todos
    if(todoToDeeleted != null){
        await TodoModel.findByIdAndDelete(JSON.parse(todoToDeeleted))
        /// remove from Redis 
        redis.del("todos_to_be_deleted");
        console.log("Todo Deleted")
    }else{
        console.log("No Todos Found In Redis To Delete")
    }
   
  });
// TodoRouter.use(authMiddleware)
TodoRouter.post("/add-todo", authMiddleware(["user"]),async (req,res)=>{
    /// title, status -> req.body
    /// createdBy should be added from req.user
    // req.user is attched in auth Middleware
    // auth Middleware checks the token and ensures, user has logged In 
    let todo = await TodoModel.create({...req.body, createdBy: req.userId})
    res.status(201).json({msg:"Todo Added", todo})
})

//TodoRouter.get("/lectures")

/// Particulars Todos
TodoRouter.get("/all-todos",authMiddleware(["user"]) ,async (req,res)=>{
    /// userId is attached to req object in  Auth Middleware
    /// For first time get data from DB also cach the data
    /// from second time provide cached data
    let cachedTodos = await redis.get("my-todo")
   // console.log(cachedTodos)
    if(!cachedTodos){
        let todos = await TodoModel.find({createdBy:req.userId});
        redis.set("my-todo",JSON.stringify(todos), "EX", 30);
        res.status(200).json({msg:"Todo List From DB", todos})
    }else{
       // console.log(cachedTodos)
        res.status(200).json({msg:"Todos from Caching", todos: JSON.parse(cachedTodos) })
    }
    
})

/// Only Admins are allowed
TodoRouter.get("/everyonestodo",authMiddleware(["admin"]) ,async (req,res)=>{
    let todos = await TodoModel.find().populate("createdBy");
    res.status(200).json({msg:"Todo List", todos})
})

TodoRouter.delete("/delete-todo/:todoId", authMiddleware(["user"]), async (req,res)=>{
    /// store the data in redis , what is data?? todoID and UserID
    // send a response as todo delete
    ///  run a cron job to delete all the todos at time
    let userId = req.userId;
    let todoId = req.params.todoId;
   
    redis.set("todos_to_be_deleted",JSON.stringify(todoId));
    res.send("Todo Deleted")

    
})

module.exports = TodoRouter;