const express = require("express");
const TodoModel = require("../models/todo.model");
const UserModel = require("../models/user.model");


const TodoRouter = express.Router();

TodoRouter.post("/add-todo", async (req,res)=>{
   try{
    let todo = new TodoModel(req.body);
    await todo.save(); /// .save(), very very very highly needed function for dev
    res.status(201).json({messsage:"Todo Added"})
   }catch(err){
    console.log(err)
    res.status(500).json({message:"Something went wrong...."})
   }
})

TodoRouter.get("/alltodos", async (req,res)=>{
  /// skip and limit will be sent through query

  const {page,limit} = req.query;
  let skippingItems = (page-1)*limit;
    let todos = await TodoModel.find().skip(skippingItems).limit(limit)
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


TodoRouter.get("/:userId", async(req,res)=>{
   const {userId} = req.params;
   /// How to get User Details In Todos??
   /// Method 1 using populate
   // .populate just fetches the details from User Collections

  // let todos = await TodoModel.find({createdBy:userId}, {createdBy:0, __v:0}).populate("createdBy")
   
  /// If there are 1000 todos, this populate runs 1000 times getting same user details
   /// hence it is not that level useful in case of too many todos
   // best solution is write two queries, 
   // 1 for user to get user deatils, another to get Todos Details
   // so there is only one query for user
   let user = await UserModel.findById(userId,{__v:0, _id:0})
   let todos = await TodoModel.find({createdBy:userId}, {createdBy:0, __v:0});
   // {createdBy:0, __v:0} means these are not-given/hidden in document
   res.status(200).json({message:"Todo List", details: {user,todos}})
})


module.exports = TodoRouter;