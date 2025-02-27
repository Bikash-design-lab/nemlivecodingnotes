const mongoose = require("mongoose");


const LectureSchema = new mongoose.Schema({
    title:{type:String, required:true},  // req.body
    startDate:Date,   // req.body
    endDate:Date,    // req.body
    attendees :[{type: mongoose.Schema.Types.ObjectId, ref:"User"} ], 
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"User"} , // req.body, should pass through a MW, which checks the user is an admin??
    notes: String, 
    courseId: {type: mongoose.Schema.Types.ObjectId, ref:"Course"}

},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})

const LectureModel = mongoose.model("Lecture",LectureSchema );

module.exports = LectureModel;