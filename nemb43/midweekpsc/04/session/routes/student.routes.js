const express = require("express");
const courseModel = require("../models/course.model");


const StudentRoutes = express.Router();

/// get my course

StudentRoutes.get("/get/course/:studentId", async(req,res)=>{
   // console.log(req.params.studentId)
    try{
        // let c = await courseModel.find({}, {lectures:0, assignments:0})
        let course = await courseModel.find({ students: { $in:  req.params.studentId}});
        if(course.length==0){
            res.status(404).json({msg:"No Courses Found"})
        }else{
            res.status(200).json({course})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({ msg: "Something went wrong" });
    }
})

StudentRoutes.get("/get/lectures/:studentId", async(req,res)=>{
    // console.log(req.params.studentId)
     try{
         // let c = await courseModel.find({}, {lectures:0, assignments:0})
         let course = await courseModel.find({ students: { $in:  req.params.studentId}}).populate("lectures");
         if(course.length==0){
             res.status(404).json({msg:"No Courses Found"})
         }else{
             res.status(200).json({lectures: course})
         }
     }catch(err){
         console.log(err)
         res.status(500).json({ msg: "Something went wrong" });
     }
 })

module.exports = StudentRoutes;