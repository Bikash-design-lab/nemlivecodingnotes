// user:String,
//     gender:{type:String, enum:["male", "female"]},
//     age:{type:Number, min:20, max:100}

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
