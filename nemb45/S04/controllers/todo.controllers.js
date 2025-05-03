const { getData, addOrUpdateTodo } = require("../models/todo.model");


const getAllTodos = (req, res) => {
    let data = getData().data;
    let todos = data.todos;
    res.json({ message: "Todos List", todos });
  }


  const getTodos = (req, res) => {
    let title = req.query.title;
    let data = getData().data;
    let filteredTodos = data.todos.filter((todo) => todo.title.includes(title));
    res.json({ message: "Todos List", todos: filteredTodos });
  }


  const AddTodo = (req, res) => {
    let data = getData().data;
    let todos = data.todos;
    let id = todos[todos.length - 1].id + 1;
    let todoTobeAdded = { ...req.body, id };
    todos.push(todoTobeAdded);
    addOrUpdateTodo(data);
    res.json({ message: "Todo Added" });
  }


  const updateTodo = (req, res) => {
    let todoId = req.params.todoId; /// todoId from req.params, {todoId:1} = req.params;
    let data = getData().data;
    let todos = data.todos;
    let foundIndex = todos.findIndex((el) => el.id == todoId);
    if (foundIndex == -1) {
      res.json({ message: "Todo Not Found..." });
    } else {
      let updatedTodos = todos.map((todo, id) => {
        if (todo.id == todoId) {
          return { ...todo, ...req.body };
        } else {
          return todo;
        }
      });
      data.todos = updatedTodos;
      addOrUpdateTodo(data);
      res.json({ message: "Todo Updated" });
    }
  }


  const deleteTodo = (req, res) => {
    let todoId = req.params.todoId; /// todoId from req.params, {todoId:1} = req.params;
    let data = getData().data;
    let todos = data.todos;
    let foundIndex = todos.findIndex((el) => el.id == todoId);
    if (foundIndex == -1) {
      res.json({ message: "Todo Not Found..." });
    } else {
      let filteredTodos = todos.filter((todo, id) => todo.id != todoId);
      data.todos = filteredTodos;
      addOrUpdateTodo(data);
      res.json({ message: "Todo Deleted" });
    }
  }
  module.exports = {getAllTodos, getTodos, AddTodo, updateTodo, deleteTodo}