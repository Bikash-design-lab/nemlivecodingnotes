const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const TodoRouter = require("./routes/todo.routes");
require("dotenv").config()
const app = express();
app.use(express.json()); /// Inbuilt json body parser middleware
connectToDB();

app.get("/home", (req, res) => {
  res.send("This Is Home Page");
});


/// Todo Routes
app.use("/todos", TodoRouter)
app.listen(8000, () => {
  console.log("Server started");
});
