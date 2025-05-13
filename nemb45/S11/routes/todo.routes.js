const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middlewares/auth.middleware");


const TodoRouter = express.Router();
/// All Todo Routes are protected routes
/// means only logged In users are allowed to make this operations

TodoRouter.use(authMiddleware)
TodoRouter.post("/add-todo", async(req,res)=>{
    /// title, status is coming from req.body
    try{
    let todo = await TodoModel.create(req.body)
    res.status(201).json({message:"Todo Added..."})
    }catch(err){
        res.status(500).json({message:"Error in adding Todo"})
    }
})
module.exports = TodoRouter;