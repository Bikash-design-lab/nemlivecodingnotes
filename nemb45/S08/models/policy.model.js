const mongoose = require("mongoose");


const policySchmea = new mongoose.Schema({
    startDate:String,
    endDate:String,
    modeOfPayment:String,
    policyHolderId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    planId:{type:mongoose.Schema.Types.ObjectId,ref:"Plan"}
})


const PolicyModel = mongoose.model("Policy", policySchmea);


module.exports = PolicyModel