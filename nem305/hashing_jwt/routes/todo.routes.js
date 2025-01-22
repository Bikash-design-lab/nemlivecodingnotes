const express = require("express");
const TodoModel = require("../models/todo.model");
const authMw = require("../middlewares/auth");


const TodoRouter = express.Router();

TodoRouter.post("/add", authMw,async (req,res)=>{
    /// title, status will be coming from req.body
    //console.log("body from todo route", req.body)
    await TodoModel.create(req.body);
    res.send("todo created")
})
module.exports = TodoRouter;