const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    status:{type:Boolean, required:true, default:false},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    assignee:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    discussions:[{type:mongoose.Schema.Types.ObjectId, ref:"Discussion"}]
    
})

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;