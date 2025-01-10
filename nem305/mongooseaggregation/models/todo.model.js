/// first i need to create a schema
// then i need to connect schema with model

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: false },
  description: String,
  deadline: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  // relationships
});

// name, status, description, deadline

const todoModel = mongoose.model("Todo", TodoSchema);

module.exports = todoModel;
