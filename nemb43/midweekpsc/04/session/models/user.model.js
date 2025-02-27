const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true, default:"pass123"},
    username:String,
    age:{type:Number, min:20, max:120},
    gender:{type:String, enum:["male","female"]},
    role:{type:String, enum:["admin", "student", "parent"], default:"student"}
})

// model 

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;

