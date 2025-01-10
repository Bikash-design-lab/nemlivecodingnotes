// Importing required modules
const express = require("express");
const todoModel = require("../models/todo.model");
const todoRouter = express.Router();

// CRUD operations for todos

// POST: Add a new todo
// Route: /add
// This endpoint accepts a todo object in the request body and adds it to the database
// Methods used: insertMany, new & save, or create (currently using .create)
todoRouter.post("/add", async (req, res) => {
  try {
    // Using the .create method to add the todo to the database
    await todoModel.create(req.body);
    res.status(200).send("Todo Added");
  } catch (err) {
    console.log(err); // Log any errors
    res.status(500).send("Something went wrong, please try again later");
  }
});

// GET: Retrieve all todos
// Route: /
// This endpoint retrieves todos with optional pagination using 'limit' and 'page' query parameters
todoRouter.get("/", async (req, res) => {
  let limit = req.query.limit; // Number of todos per page
  let skip = (req.query.page - 1) * limit; // Calculating the number of documents to skip

  // Retrieve todos with pagination
  let todos = await todoModel.find().skip(skip).limit(limit).populate("user");
  res.send(todos);
});

// GET: Retrieve todos based on queries
// Route: /search
// This endpoint allows searching and sorting todos by various criteria (name, status, gender) with optional pagination
todoRouter.get("/search", async (req, res) => {
  let limit = req.query.limit; // Number of todos per page
  let skip = (req.query.page - 1) * limit; // Calculating the number of documents to skip

  let queryObj = {}; // Filter criteria object

  // Filter by name (case-insensitive partial match)
  if (req.query.name) {
    queryObj.name = { $regex: `${req.query.name}`, $options: "i" };
  }

  // Filter by status
  if (req.query.status) {
    queryObj.status = req.query.status;
  }

  // Filter by gender
  if (req.query.gender) {
    queryObj.gender = req.query.gender;
  }

  let sortObj = {}; // Sorting object

  // Sorting by specified field and order (ascending or descending)
  if (req.query.sort) {
    let sorting_case = req.query.sort;
    sortObj[sorting_case] = req.query.order === "asc" ? 1 : -1;
  }

  // Retrieve todos based on filters, sorting, and pagination
  let todos = await todoModel
    .find(queryObj, { _id: 0 }) // Exclude the _id field from the response
    .sort(sortObj)
    .skip(skip)
    .limit(limit);
  res.send(todos);
});

// GET: Retrieve a particular todo by ID
// Route: /:id
// This endpoint retrieves a todo based on its unique ID
todoRouter.get("/:id", async (req, res) => {
  let todos = await todoModel.find({ _id: req.params.id }); // Find todo by ID
  res.send(todos);
});

// PUT: Update a todo
// Route: /:id
// This endpoint updates a todo's details using its unique ID and the request body
todoRouter.put("/:id", async (req, res) => {
  let id = req.params.id; // Extract the ID from the URL parameters
  await todoModel.findByIdAndUpdate(id, req.body); // Update the todo in the database
  res.send("Todo Updated...");
});

// DELETE: Delete a todo
// Route: /:id
// This endpoint deletes a todo using its unique ID
todoRouter.delete("/:id", async (req, res) => {
  let id = req.params.id; // Extract the ID from the URL parameters
  await todoModel.findByIdAndDelete(id); // Delete the todo from the database
  res.send("Todo Deleted...");
});

// Exporting the router module for use in the main application
module.exports = todoRouter;
