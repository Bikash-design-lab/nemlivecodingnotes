const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:["admin", "user"], default:"user"} // change number 1 
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;