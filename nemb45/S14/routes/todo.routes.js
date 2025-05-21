const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middlewares/auth.middleware");
const redis = require("../configs/redis.config");

const TodoRouter = express.Router();
/// All Todo Routes are protected routes
/// means only logged In users are allowed to make this operations

TodoRouter.post(
  "/add-todo",
  authMiddleware("user", "admin"),
  async (req, res) => {
    /// title, status is coming from req.body
    ///console.log("req.user in protected route", req.user)
    try {
      let todo = await TodoModel.create({ ...req.body, createdBy: req.user });
      res.status(201).json({ message: "Todo Added..." });
    } catch (err) {
      res.status(500).json({ message: "Error in adding Todo" });
    }
  }
);

TodoRouter.get( "/alltodos", authMiddleware("user", "admin"),async (req, res) => {
    /// first check whether data is present in redis
    /// if yes, send response from redis data
    /// if no, get Data from DB, store in Redis then send a response
    let todos;
    try {

        let cachedData = await redis.get(req.user)
        if(!cachedData){
            /// No Data is found in Redis, get from DB and store in Redis
             todos = await TodoModel.find({ createdBy: req.user });
            // set the data in redis
            redis.set(req.user, JSON.stringify(todos),"EX", 30);
            res.status(200).json({ message: "Todo List From DB...", todos });
        }else{
            // data is present in redis
            console.log(cachedData)
            todos = JSON.parse(cachedData)
            res.status(200).json({ message: "Todo List From Redis-Cache...", todos });
        }
      
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Error in getting Todo" });
    }
  }
);

module.exports = TodoRouter;
