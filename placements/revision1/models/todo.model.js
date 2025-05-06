const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:Boolean
})

const TodoModel = mongoose.model("Todo",todoSchema )

module.exports = TodoModel;