const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
    name:String,
    status:{type:Boolean, default:false}
})


const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;