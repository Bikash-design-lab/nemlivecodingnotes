const express = require("express");
const UserRouter = require("./routes/user.routes");
const connectToDb = require("./configs/mongo.db");
const OrderRouter = require("./routes/order.routes");

require("dotenv").config();
connectToDb(); /// connecting mongoDb with Node JS
const app = express();
app.use(express.json());

app.use("/users", UserRouter);
app.use("/orders", OrderRouter)
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
