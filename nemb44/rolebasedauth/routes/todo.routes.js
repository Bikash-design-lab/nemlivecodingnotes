const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const TodoModel = require("../models/todo.model");

const TodoRouter = express.Router();

// TodoRouter.use(authMiddleware)
TodoRouter.post("/add-todo", authMiddleware(["user", "admin"]),async (req,res)=>{
    /// title, status -> req.body
    /// createdBy should be added from req.user
    // req.user is attched in auth Middleware
    // auth Middleware checks the token and ensures, user has logged In 
    let todo = await TodoModel.create({...req.body, createdBy: req.userId})
    res.status(201).json({msg:"Todo Added", todo})
})

//TodoRouter.get("/lectures")

/// Particulars Todos
TodoRouter.get("/all-todos", authMiddleware(["user"]),async (req,res)=>{
    /// userId is attached to req object in  Auth Middleware
    let todos = await TodoModel.find({createdBy:req.userId})
    res.status(200).json({msg:"Todo List", todos})
})

/// Only Admins are allowed
TodoRouter.get("/everyonestodo",authMiddleware(["admin"]) ,async (req,res)=>{
    let todos = await TodoModel.find().populate("createdBy");
    res.status(200).json({msg:"Todo List", todos})
})

module.exports = TodoRouter;