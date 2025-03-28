const express = require("express");
const {
  getAllTodos,
  getTodosById,
  getTodosByQuery,
  addTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todo.controllers");
const checkIncomingTodo = require("../middlewares/checkIncomingTodo");
const limiter = require("../middlewares/rateLimiter");



const todoRouter = express.Router();
// location of application is very imp
// todoRouter.use(checkIncomingTodo);
// Apply the rate limiting middleware to all requests.
todoRouter.get("/get-todos", limiter,getAllTodos);

/// get todo by Id

todoRouter.get("/:id", limiter,getTodosById);
// get todo by query
todoRouter.get("/", limiter,getTodosByQuery);

// post request
todoRouter.post("/add-todo", checkIncomingTodo, addTodo);

todoRouter.put("/update-todo/:id",checkIncomingTodo, updateTodoById);

todoRouter.delete("/delete-todo/:id", deleteTodoById);

module.exports = todoRouter;
