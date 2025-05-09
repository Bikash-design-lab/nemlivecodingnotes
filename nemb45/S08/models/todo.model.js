const mongoose = require('mongoose');


let todoSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    description:String,
    status:{type:Boolean, default:false},
    progression:{type:String, enum:["Paused", "InProgress", "AboutToComplete"], default:"InProgress"}, /// Paused, InProgress, AboutToComplete
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true} 
    /// userId ref from User Collection
    /// We established relationship with user collection
})

let TodoModel = mongoose.model("Todo",todoSchema);

module.exports = TodoModel;