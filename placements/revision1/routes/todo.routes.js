const express = require("express");
const TodoModel = require("../models/todo.model");
const loggerMiddleware = require("../middlewares/logger.middleware");


const TodoRouter = express.Router();

/// Router Level Middleware
// TodoRouter.use(loggerMiddleware)
TodoRouter.post("/add-todo", async (req,res)=>{
    /// title, description, status coming from req.body
    /// push thsi into DB by insertMany fn or .create()
    let todo = req.body;
   try{
    await TodoModel.create(todo);
    res.status(201).json({message:"Todo Added"})
   }catch(err){
    console.log(err)
    res.status(500).json({message:"Something went wrong please try again later"})
   }
})
module.exports = TodoRouter;