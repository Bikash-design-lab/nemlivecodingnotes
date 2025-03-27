const express = require("express");
const fs = require("fs")

const todoRouter = express.Router();

// i want to create routes for todos
todoRouter.get("/get-todos", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  res.status(200).send({ msg: "List of todos", todos });
});

/// get todo by Id

todoRouter.get("/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);
 
  if (index == -1) {
    // todo is not present
    res.status(404).send("Todo Not Found");
  } else {
    // todo found

    todos.forEach((el) => {
      if (el.id == id) {
        res.status(200).send({ todo: el });
      }
    });
  }
});

// get todo by query
todoRouter.get("/todos", (req, res) => {
  // console.log(req.query)
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  const { name } = req.query;
  if (name) {
    // search the todo of the that and send a response
    let fileteredTodos = todos.filter((el) => {
      if (el.name.includes(name)) {
        return el;
      }
    });
    if (fileteredTodos.length == 0) {
      res.status(404).send("No Todos found....");
      return;
    }
    res.send({ todos: fileteredTodos });
  } else {
    // send all the todos
    res.send({ msg: "List of todos", todos });
  }
});
// post request

todoRouter.post("/add-todo", (req, res) => {
  let newTodo = req.body;
  /// logic to add todo in the db??
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  // push the incoming req.body which is a newTodo
  todos.push(newTodo); // heap memory
  // console.log(data)
  // update the data in db.json
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.status(201).send("Todo Added...");
});

todoRouter.put("/update-todo/:id", (req, res) => {
  // :id is called as path params
  // params is key value pair in req object
  // console.log(req.params)
  //    let id = req.params.id;
  let { id } = req.params;
  // check whether the todos of this id is present
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);
  /// console.log(index)
  if (index == -1) {
    // todo is not present
    res.send("Todo Not Found");
  } else {
    // todo found
    /// req.body data to be updated in todo is coming
    let updatedTodos = todos.map((el, i) => {
      if (el.id == id) {
        return { ...el, ...req.body };
      } else {
        return el;
      }
    });
    data.todos = updatedTodos;
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send("Todo Updated....");
  }
});

todoRouter.delete("/delete-todo/:id", (req, res) => {
  // :id is called as path params
  // params is key value pair in req object
  // console.log(req.params)
  //    let id = req.params.id;
  let { id } = req.params;
  // check whether the todos of this id is present
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);
  /// console.log(index)
  if (index == -1) {
    // todo is not present

    res.send("Todo Not Found");
  } else {
    // todo found
    /// req.body data to be updated in todo is coming
    let filteredTodos = todos.filter((el, i) => {
      return el.id != id;
    });
    data.todos = filteredTodos;
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send("Todo Deleted....");
  }
});



module.exports = todoRouter;
