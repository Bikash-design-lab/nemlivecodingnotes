const express = require("express");
const TodoModel = require("../models/todo.model");
const redisClient = require("../config/redis");


const TodoRouter = express.Router();


TodoRouter.post("/add", async (req,res)=>{
    /// userid and title --> req.body 

    let newTodos = await TodoModel.create(req.body);
    await redisClient.hDel(req.body.userId, 'todos');
    res.send("todos added")
})


TodoRouter.get("/:userId", async(req,res)=>{
 
   
   let cachedTodos = await redisClient.hGet(req.params.userId, "todos")
   
    if(cachedTodos !=null ){
        res.status(200).json({source:"Redis", todos:JSON.parse(cachedTodos)})
    }else{
        let todos = await TodoModel.find({userId:req.params.userId})
        // store in redis
        await redisClient.hSet(req.params.userId, "todos", JSON.stringify(todos))
        await redisClient.expire(req.params.userId, 60);
        res.status(200).json({source:"Database", todos})
    }
   
})
module.exports = TodoRouter