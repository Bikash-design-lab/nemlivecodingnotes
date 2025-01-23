const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    role:{type:String, enum:["user", "admin"], default:"user"}
})

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;