const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
    title:{type:String, required:true},  // req.body
    startDate:Date,   // req.body
    endDate:Date,    // req.body
    students: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}], // added later
    lectures: [{type: mongoose.Schema.Types.ObjectId}],  // added later
    assignments:[{type: mongoose.Schema.Types.ObjectId}], // added later
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"User"}  
    // req.body, should pass through a MW, which checks the user is an admin??

},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})

const courseModel = mongoose.model("Course",CourseSchema );

module.exports = courseModel;