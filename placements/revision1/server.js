const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const TodoRouter = require("./routes/todo.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
require("dotenv").config()
const app = express();
app.use(express.json()); /// Inbuilt json body parser middleware
connectToDB();

/// Application level Middleware
// app.use(loggerMiddleware)

/// Route/Method level Middleware
app.get("/home", loggerMiddleware ,(req, res) => {
  res.send("This Is Home Page");
});


/// Todo Routes
app.use("/todos", TodoRouter)
app.listen(8000, () => {
  console.log("Server started");
});
