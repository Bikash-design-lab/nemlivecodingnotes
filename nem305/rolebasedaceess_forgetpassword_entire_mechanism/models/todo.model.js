const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title:String, 
    status:{type:Boolean, default:false},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
})

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = TodoModel;