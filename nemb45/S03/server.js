const express = require("express");
const fs = require("fs");

const app = express();

/// Important fn
app.use(express.json()); // This is an inbuilt function which tells express to sense json body coming from req

//// First Route

app.get("/home", (req, res) => {
  res.json({ message: "This is home page" });
});

app.get("/aboutus", (req, res) => {
  res.json({ message: "This is aboutus page" });
});
/// Post request
app.post("/contactus", (req, res) => {
  res.json({ message: "This is post request" });
});
/// Patch

app.patch("/patch", (req, res) => {
  res.json({ message: "This is patch request" });
});

/// Delete request
app.delete("/delete", (req, res) => {
  res.json({ message: "This is delete request" });
});
/// Get all todos
app.get("/alltodos", (req, res) => {
  // read the data from db.json through fs module, parse the data as readFile gives string
  /// send the todos as response
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  //console.log(data);
  let todos = data.todos;
  res.json({ message: "Todos List", todos });
});

// get todos by query
app.get("/todos", (req, res) => {
  /// query is coming from req.query
  // console.log(req.query)
  let title = req.query.title;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  // //console.log(data);
  let filteredTodos = data.todos.filter((todo) => todo.title.includes(title));
  res.json({ message: "Todos List", todos: filteredTodos });
});

/// Add Todos
app.post("/add-todo", (req, res) => {
  /// title, description should be coming from Postman
  /// insert incoming todo into db.json
  /// read the data, push incoming todo into data.todos
  /// then send an response as Todo Added

  /// req is an huge object
  //console.log(req.body);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  /// Add Id from Backend
  /// id = Prev todoId + 1
  let id = todos[todos.length - 1].id + 1;
  //console.log(id, todos[todos.length-1])
  let todoTobeAdded = { ...req.body, id };
  todos.push(todoTobeAdded);
  // console.log(todos)
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.json({ message: "Todo Added" });
});

/// Update a existing todo, patch request
app.patch("/update-todo/:todoId", (req, res) => {
  // console.log(req.params.todoId)
  /// how to send id,
  /// body
  /// but prefered and standard practice is, through path params
  // check whether todo of todoId given in path params exits or not
  /// if not, send response as Todo Not Found
  /// if yes, take todo to be updated from body
  //           and update the todo and give res as todo updated
  let todoId = req.params.todoId; /// todoId from req.params, {todoId:1} = req.params;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let foundIndex = todos.findIndex((el) => el.id == todoId);
  //console.log(foundIndex, todoId)
  if (foundIndex == -1) {
    /// which means todoId not found in db.json
    res.json({ message: "Todo Not Found..." });
  } else {
    /// todo is found in db.json
    /// map into todos array replace the updated data from body & write the data again in db.json

    let updatedTodos = todos.map((todo, id) => {
      if (todo.id == todoId) {
        return { ...todo, ...req.body };
      } else {
        return todo;
      }
    });
    //console.log(updatedTodos)
    data.todos = updatedTodos;
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.json({ message: "Todo Updated" });
  }
});

/// Delete  an existing todo, delete request
app.delete("/delete-todo/:todoId", (req, res) => {
  let todoId = req.params.todoId; /// todoId from req.params, {todoId:1} = req.params;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let foundIndex = todos.findIndex((el) => el.id == todoId);
  //console.log(foundIndex, todoId)
  if (foundIndex == -1) {
    /// which means todoId not found in db.json
    res.json({ message: "Todo Not Found..." });
  } else {
    /// todo is found in db.json
    /// filter into todos array & write the data again in db.json

    let filteredTodos = todos.filter((todo, id) => todo.id != todoId);
    //console.log(updatedTodos)
    data.todos = filteredTodos;
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.json({ message: "Todo Deleted" });
  }
});

app.listen(8000, () => {
  console.log("Server Started");
});
