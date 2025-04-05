const express = require("express");
const TodoModel = require("../models/todo.model");
const DiscussionModel = require("../models/discussion.model");

const TodoRouter = express.Router();

TodoRouter.post("/add-todo", async (req, res) => {
  try {
    let todo = await TodoModel.create(req.body);
    res.status(200).json({ msg: "Todo Created", todo });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

TodoRouter.get("/get-todos/users/:userId", async (req, res) => {
  try {
    let todos = await TodoModel.find(
      { userId: req.params.userId },
      { userId: 0, __v: 0 }
    );
    res.status(200).json({ msg: "Todos List", todos });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});
TodoRouter.get("/get-todos/:todoId", async (req, res) => {
  try {
    let todos = await TodoModel.find(
      { _id: req.params.todoId },
      { userId: 0, __v: 0 }
    );
    let discussion = await DiscussionModel.find({todoId:req.params.todoId})
    todos.discussion = discussion;
    res.status(200).json({ msg: "Todos List", todos });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

TodoRouter.post("/add-discussions/:todoId", async (req, res) => {
  /// req.body -> desc and userID
  const { todoId } = req.params;
  try {
    let todo = await TodoModel.findById(todoId);
    if (todo) {
      let discussion = await DiscussionModel.create({ ...req.body, todoId });
      todo.discussions.push(discussion._id)
      await todo.save()
      res.status(201).json({ msg: "Discussion Added" });
    } else {
      res.status(404).json({ msg: "This Todo is not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

TodoRouter.patch("/add-assignee/:todoId", async (req,res)=>{
    const { todoId } = req.params;
    const {userId} = req.body;
    const {creator_id} = req.headers;
    // console.log(creator_id)
  try {
    let todo = await TodoModel.findById(todoId);
    if (todo) {
     if(todo.userId == creator_id){
        todo. assignee.push(userId)
        await todo.save()
        res.status(201).json({ msg: "Assignee Added" });
     }else{
        res.status(401).json({msg:"Unauthorised to assign...."})
     }
    } else {
      res.status(404).json({ msg: "This Todo is not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
})

TodoRouter.get("/dashboard", async (req,res)=>{
  try{
    let todoAggregation = await TodoModel.aggregate([
      {$group:{
        _id:"$userId",
        todos:{
          $push:{
            todoId:"$_id",
            title:"$title",
            status:"$status"
          }
        },
        total:{$sum:1}
      }}
    ])
    res.status(200).json({msg:"Dashboard Data", data: todoAggregation})
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
})

/// update todo by todoID and delete todo by todoID
module.exports = TodoRouter;
