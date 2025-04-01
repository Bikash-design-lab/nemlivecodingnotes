const mongoose = require("mongoose"); /// importing
const express = require("express");
// connecting Node with MongoDB
require('dotenv').config()
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB ");
  })
  .catch((err) => {
    console.log("err in connecting DB");
    console.log(err);
  });

const app = express();
app.use(express.json());
/// I need to interact with DB by doing some CRUD operations
/// Create Schema First
/// Schema means defining the structure of a document

// Schema is very very very very Important
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  location: String,
  isMarried: Boolean,
});

// once schema is created can I Interact with DB???
/// No, Model is responsible to interact with DB
/// create a model then,

const UserModel = mongoose.model("User", userSchema);

/// User is collection Name

/// CRUD operations

///create a data
// db.Users.insertOne
//insertOne -->
// .create(), new .save()
// let newUser = UserModel.create({name:"Bob",age:53,location:"Bihar", isMarried:false });

// newUser.then(()=>{
//     console.log("Data added in User Collection in nemb44 Database")
// }).catch((err)=>{
//     console.log("Error in adding data")
// })

// read the data

// let users = UserModel.find();

// users.then((data)=>{
//     console.log("data", data)
// }).catch((err)=>{
//     console.log("Error in adding data")
// })

app.get("/all-users", async (req, res) => {
  try {
    let users = await UserModel.find();
    /// the below line should work after users getting from Database or after above line execution ended
    res.status(200).json({ msg: "List of Users", users });
  } catch (err) {
    //console.log(err)
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later...." });
  }
});

app.post("/add-user", async (req, res) => {
  /// req.body is user data, it is an object
  // that should be added in the Model
  try {
    let user = await UserModel.create({ ...req.body });
    res.status(201).json({ msg: "User Created", user });
  } catch (err) {
    //console.log(err)
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later...." });
  }
});

app.patch("/update-user/:id", async (req, res) => {
  /// req.body is updated userdata
  try {
    const { id } = req.params;
    let updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {new:true});
    res.status(201).json({ msg: "User Updated", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later...." });
  }
});

app.delete("/delete-user/:id", async (req, res) => {
    /// req.body is updated userdata
    try {
      const { id } = req.params;
      let updatedUser = await UserModel.findByIdAndDelete(id);
      res.status(201).json({ msg: "User Deleted" });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Something went wrong please try again later...." });
    }
  });
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
