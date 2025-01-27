const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
    title:String, 
    userId:String
})


const TodoModel = mongoose.model("todo", TodoSchema);

module.exports= TodoModel;