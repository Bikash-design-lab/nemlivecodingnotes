const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const Todo = require("../models/todo.model");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/nemtest");
});
afterAll(async () => {
  await mongoose.disconnect();
});
test("GET / Returns This is test route", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Welcome to our website");
});

test("Creates a new Todo", async () => {
  const todo = new Todo({ name: "Learn Testing" });
  await todo.save();
  const foundTodo = await Todo.findOne({ name: "Learn Testing" });
  expect(foundTodo.name).toBe("Learn Testing");
});

test("POST / Creates a new Todo", async () => {
  const response = await request(app)
    .post("/todos")
    .send({ name: "Learn Testing" });
  expect(response.status).toBe(201);
  expect(response.body.message.name).toBe("Learn Testing");
  expect(response.body.message.status).toBe(false);
});

test("PUT / Updates a Todo", async () => {
  const todo = new Todo({ name: "Learn Beating" });
  await todo.save();
  const foundTodo = await Todo.findOne({ name: "Learn Beating" });
  const response = await request(app)
    .put(`/todos/${foundTodo._id}`)
    .send({ name: "Learn Jest" });
    console.log(response.body)
  expect(response.status).toBe(200);
  expect(response.body.message.name).toBe("Learn Jest");
  expect(response.body.message.status).toBe(false);
});
