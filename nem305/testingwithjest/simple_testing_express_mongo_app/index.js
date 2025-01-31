const express = require("express");
const mongoose = require("mongoose");
const TodoModel = require("./models/todo.model");
require('dotenv').config()
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/nemtest").then(() => {
  console.log("connected to db");
});

app.get("/", (req, res) => {
  res.status(200).json({message:"Welcome to our website"})
});

app.get("/todos", async (req, res) => {
  let data = await TodoModel.find();
  res.status(200).json({ data });
});

app.post("/todos", async (req, res) => {
  let todo = await TodoModel.create(req.body);
  res.status(201).json({message:todo});
});

app.put("/todos/:id", async (req, res) => {
  let todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body);
  console.log(todo)
  res.status(200).json({message:todo});
});

app.delete("/todos/:id", async (req, res) => {
  await TodoModel.findByIdAndDelete(req.params.id);
  res.status(200).send("Todo Deleted");
});


if(process.env.DEV_ENV !="Test"){
    app.listen(8080, ()=>{ console.log("server started")})
}

module.exports = app;
