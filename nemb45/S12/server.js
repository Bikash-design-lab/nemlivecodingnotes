const express = require("express");
const connectDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.get("/test", (req, res) => {
  {
    res.status(200).json({ message: "This is test route!" });
  }
});
/// User Routes
app.use("/users", UserRouter);
// Todo Routes
app.use("/todos", TodoRouter);
app.listen(8000, () => {
  console.log("Server started");
});
