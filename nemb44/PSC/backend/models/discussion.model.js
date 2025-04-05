const mongoose = require("mongoose");


const discussionSchema = new mongoose.Schema({
    desc:{type:String, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    todoId:{type:mongoose.Schema.Types.ObjectId, ref:"Todo"}
})


const DiscussionModel = mongoose.model("Discussion", discussionSchema);

module.exports = DiscussionModel;