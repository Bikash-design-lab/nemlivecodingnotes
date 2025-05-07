const express = require("express");
const TodoModel = require("../models/todo.model");


const TodoRouter = express.Router();

TodoRouter.post("/add-todo", async (req,res)=>{

    /// title, decsription, status, NoOfLikes are coming req.body is itself in object
    /// these to be added in DB and res given as Todo Added
  //  const {title, description, status, noOfLikes} = req.body

  /// There are two functions to insert An document 
  /// 1. .create 
    ///  await TodoModel.create(req.body); /// XXXXX No InsertOne in Mongoose XXXX
  /// 2.  new - .save()
    let todo = new TodoModel(req.body);
    await todo.save(); /// .save(), very very very highly needed function for dev
    res.status(201).json({messsage:"Todo Added"})
})

TodoRouter.get("/alltodos", async (req,res)=>{
    let todos = await TodoModel.find()
    res.status(200).json({message:"Todos List", todos})
})

TodoRouter.patch("/update-todo/:todoId", async(req,res)=>{
   /// Data to be updated is coming from req.body
   const {todoId} = req.params;

   console.log(todoId, req.body)
   let todo = await TodoModel.findByIdAndUpdate(todoId,req.body, {new:true});  
   /// first one is finding by Id and secod parameter data to be updated
   res.status(201).json({message:"Todo Updated", todo})

})
module.exports = TodoRouter;