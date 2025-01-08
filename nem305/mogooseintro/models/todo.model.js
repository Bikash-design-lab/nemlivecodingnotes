/// first i need to create a schema
// then i need to connect schema with model

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    name: String,
    status: Boolean, 
    description: String,
    deadline: String,
})

// name, status, description, deadline

const todoModel = mongoose.model("todos", TodoSchema);

module.exports = todoModel;