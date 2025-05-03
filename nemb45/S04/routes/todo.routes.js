const express = require("express");
const {
  getAllTodos,
  getTodos,
  AddTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controllers");
const { getIncomingTodo, TodoRouterMiddleware } = require("../middleware/todo.middlewares");
/// 
const TodoRouter = express.Router(); /// Router is an function helps us to create Routers


TodoRouter.use(TodoRouterMiddleware)
/// Get all todos
TodoRouter.get("/alltodos", getAllTodos);

// get todos by query
TodoRouter.get("/todos", getTodos);






/// Add Todos
TodoRouter.post("/add-todo", getIncomingTodo, AddTodo);

/// Update a existing todo, patch request
TodoRouter.patch("/update-todo/:todoId", updateTodo);

/// Delete  an existing todo, delete request
TodoRouter.delete("/delete-todo/:todoId", deleteTodo);

module.exports = TodoRouter;
