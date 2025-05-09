const mongoose = require("mongoose");


const planSchema = new mongoose.Schema({
    name:String,
    investMent:Number,
    returns:Number,
    duration:Number
})


const PlanModel = mongoose.model("Plan", planSchema);


module.exports = PlanModel