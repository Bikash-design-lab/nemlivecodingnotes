const express = require("express");
const todoModel = require("../models/todo.model");
const todoRouter = express.Router();

// crud of todos

// post a todo

todoRouter.post("/add", async (req, res) => {
  /// req.body == todoData
  // that req.body should be pushed into todoModel
  try {
    // first method : insertMany
    // await todoModel.insertMany([req.body])
    // second method to post to todo new & save method
    // let todo = new todoModel(req.body)
    // await todo.save()
    // third method, using .create Method
    await todoModel.create(req.body);
    res.status(200).send("Todo Added");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong please try again later");
  }
});

// get all todo
todoRouter.get("/", async (req, res) => {
  let todos = await todoModel.find();
  res.send(todos);
});

// get a particular todo by id
todoRouter.get("/:id", async (req, res) => {
  let todos = await todoModel.find({ _id: req.params.id });
  res.send(todos);
});

// update a todo
todoRouter.put("/:id", async (req, res) => {
  /// id is coming from params
  //console.log(req.params);
  let id = req.params.id;
  await todoModel.findByIdAndUpdate(id, req.body);
  res.send("Todo Updated...");
});

// delete a todo
todoRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await todoModel.findByIdAndDelete(id);
  res.send("Todo Deleted...");
});
module.exports = todoRouter;
