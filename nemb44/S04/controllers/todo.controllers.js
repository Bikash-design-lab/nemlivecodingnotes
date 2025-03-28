const { getData, addOrUpdateTodos } = require("../models/todo.model");


const getAllTodos = (req, res) => {
    let todos = getData().todos;
    res.status(200).json({ msg: "List of todos", todos });
  }

const getTodosById = (req, res) => {
    let id = req.params.id;
    let todos = getData().todos;
    let index = todos.findIndex((el) => el.id == id);
    if (index == -1) {
      // todo is not present
      res.status(404).json({msg: "Todo Not Found"});
    } else {
      // todo found
  
      todos.forEach((el) => {
        if (el.id == id) {
          res.status(200).json({ todo: el });
        }
      });
    }
  }
const getTodosByQuery = (req, res) => {
    let todos = getData().todos;
    const { name } = req.query;
    if (name) {
      let fileteredTodos = todos.filter((el) => {
        if (el.name.includes(name)) {
          return el;
        }
      });
      if (fileteredTodos.length == 0) {
        res.status(404).json({msg: "No Todos found...."});
        return;
      }
      res.json({ todos: fileteredTodos });
    } else {
      res.json({ msg: "List of todos", todos });
    }
  }


  const addTodo = (req, res) => {
    const {name, status, id} = req.body;
    let newTodo = {name, status,id}
    let data = getData().data;
    let todos = data.todos;
    todos.push(newTodo); // heap memory
    addOrUpdateTodos(data)
    res.status(201).json({msg:"Todo Added..."});
  }


  const updateTodoById = (req, res) => {
    let { id } = req.params;
    let data = getData().data;
    let todos = data.todos;
    let index = todos.findIndex((el) => el.id == id);
    if (index == -1) {
      res.status(404).json({msg:"Todo Not Found"});
    } else {
      let updatedTodos = todos.map((el, i) => {
        if (el.id == id) {
          return { ...el, ...req.body };
        } else {
          return el;
        }
      });
      data.todos = updatedTodos;
      addOrUpdateTodos(data)
      res.json({msg:"Todo Updated...."});
    }
  }


  const deleteTodoById = (req, res) => {
    let { id } = req.params;
    let data = getData().data;
    let todos = data.todos;
    let index = todos.findIndex((el) => el.id == id);
    if (index == -1) {
      res.json({msg:"Todo Not Found"});
    } else {
      let filteredTodos = todos.filter((el, i) => {
        return el.id != id;
      });
      data.todos = filteredTodos;
      addOrUpdateTodos(data)
      res.json({msg:"Todo Deleted...."});
    }
  }
module.exports = {getAllTodos, getTodosById, getTodosByQuery, addTodo, updateTodoById, deleteTodoById}