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


TodoRouter.get("/get", authMw(["user"]), async(req,res)=>{
    let todos = await TodoModel.find({userId: req.body.userId})
    res.status(200).json({msg:"Todos", data:todos})
})


TodoRouter.get("/admin/get", authMw(["admin"]), async(req,res)=>{
    let todos = await TodoModel.find()
    res.status(200).json({msg:"Todos", data:todos})
})


TodoRouter.get("/get/:id", authMw(["admin", "user"]), async(req,res)=>{
    if(req.role=="admin"){
        let todo = await TodoModel.findOne({_id: req.params.id})
        res.json({todo})
    }else{
        let todo = await TodoModel.findOne({_id: req.params.id, userId:req.body.userId})
        res.json({todo})
    }
   
})
module.exports = TodoRouter;