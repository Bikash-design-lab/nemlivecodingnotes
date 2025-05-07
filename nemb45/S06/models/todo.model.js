const mongoose = require('mongoose');


let todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:Boolean,
    noOfLikes:Number
})

let TodoModel = mongoose.model("Todo",todoSchema);

module.exports = TodoModel;