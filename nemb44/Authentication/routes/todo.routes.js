const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const TodoModel = require("../models/todo.model");



const TodoRouter = express.Router();

TodoRouter.use(authMiddleware)
/// This is protected route, only logged In user can use this route
TodoRouter.post("/add-todo", async (req,res)=>{
    /// title is coming from request
    // createdBY??? should be given by auth Middleware
    ///console.log(req.user)

    let todo = await TodoModel.create({...req.body, createdBy:req.user})
    res.json({msg:"Todo Added...",todo})
})




module.exports = TodoRouter;