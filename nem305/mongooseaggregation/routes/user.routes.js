const express = require("express");
const userModel = require("../models/user.model");
const todoModel = require("../models/todo.model");
const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  // req.body is user data
  let user = new userModel(req.body);
  await user.save();
  res.json({ msg: "User Created", data: user });
});

userRouter.get("/mytodos/:userId", async (req, res) => {
  // userId --> params
  let userId = req.params.userId;
  // find({_id:req.params.userId})
   let data = await todoModel.find({ user: userId }, { user: 0 });
  //let data = await todoModel.aggregate([{$group:{_id:"$state"}}])
  res.json({ msg: `Here is the todos of user ${userId}`, data });
});
module.exports = userRouter;
