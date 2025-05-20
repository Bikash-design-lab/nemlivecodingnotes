const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middlewares/auth.middleware");


const TodoRouter = express.Router();
/// All Todo Routes are protected routes
/// means only logged In users are allowed to make this operations


TodoRouter.post("/add-todo",authMiddleware("user","admin") ,async(req,res)=>{
    /// title, status is coming from req.body
    ///console.log("req.user in protected route", req.user)
    try{
    let todo = await TodoModel.create({...req.body, createdBy:req.user})
    res.status(201).json({message:"Todo Added..."})
    }catch(err){
        res.status(500).json({message:"Error in adding Todo"})
    }
})

TodoRouter.get("/alltodos", authMiddleware("user", "admin"),async(req,res)=>{
    /// title, status is coming from req.body
    ///console.log("req.user in protected route", req.user)
    try{
        let todos = [];
    if(req.userRole=="admin"){
      todos = await TodoModel.find()
    }else{
     todos = await TodoModel.find({createdBy:req.user})
    }
    res.status(200).json({message:"Todo List...", todos})
    }catch(err){
        
        res.status(500).json({message:"Error in getting Todo"})
    }
})
module.exports = TodoRouter;