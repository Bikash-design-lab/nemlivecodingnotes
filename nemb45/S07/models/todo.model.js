const mongoose = require('mongoose');


let todoSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    description:String,
    status:{type:Boolean, default:false},
    progression:{type:String, enum:["Paused", "InProgress", "AboutToComplete"], default:"InProgress"}, /// Paused, InProgress, AboutToComplete
    noOfLikes:{type:Number, min:0, max:100, default:0}
})

let TodoModel = mongoose.model("Todo",todoSchema);

module.exports = TodoModel;