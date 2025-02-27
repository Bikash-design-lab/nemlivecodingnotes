const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const courseModel = require("../models/course.model");
const LectureModel = require("../models/lecture.model");

const AdminRoutes = express.Router();

/// create a course
AdminRoutes.post("/course/add", checkAdmin,async (req,res)=>{
    // title, startDate, endDate, createdBy are coming from req.body
    // createdBy checked by a MW, once user is confirmed as Admin
    try{
        let course = await courseModel.create(req.body)
    res.status(201).json({msg:"Course Created"})
    }catch(err){
        res.status(500).json({ msg: "Something went wrong" });
    }
})

AdminRoutes.get("/course/get", checkAdmin,async (req,res)=>{
    // title, startDate, endDate, createdBy are coming from req.body
    // createdBy checked by a MW, once user is confirmed as Admin
    try{
        let courses = await courseModel.find()
    res.status(201).json({msg:"Course List",courses })
    }catch(err){
        res.status(500).json({ msg: "Something went wrong" });
    }
})

AdminRoutes.patch("/course/addstudents/:courseId", checkAdmin, async (req,res)=>{
    /// student ids are sent in an aray, also userId
    // update courseModel with these students Ids
    let course = await courseModel.findById(req.params.courseId);
    if(course){
        /// add students in the array called as students
        course.students = [...course.students, ...req.body.students];
        await course.save()
        res.status(200).json({msg:"Students Added To The Course"})
    }else{
        res.status(404).json({msg:"Course Not Found"})
    }
})

AdminRoutes.get("/course/getstudents/:courseId", checkAdmin, async (req,res)=>{
    // createdBy is coming from body for checkAdmin Middleware
    let course = await courseModel.findById(req.params.courseId).populate("students");
    if(course){
        /// add students in the array called as students
        res.status(200).json({msg:"Students Data", course})
    }else{
        res.status(404).json({msg:"Course Not Found"})
    }
})

// remove students from the course
AdminRoutes.patch("/course/removestudents/:courseId", checkAdmin, async (req,res)=>{
    /// student ids are sent in an array, also userId
    // update courseModel with these students Ids
    let course = await courseModel.findById(req.params.courseId);
    // let students = req.body.students; // coming from body
    if(course){
       //Method 1: filter using HOF
    //    let filteredStudents = course.students.filter((el,i)=>{
    //     return (!studentsArray.includes(el._id))
    //    })
    //     course.students = filteredStudents;
    //     await course.save()
        // Method 2: using $pull operator
     await courseModel.findByIdAndUpdate(req.params.courseId, { $pull: { students: { $in: [ ...req.body.students ] }} })
     
        res.status(200).json({msg:"Students Removed From The Course"})
    }else{
        res.status(404).json({msg:"Course Not Found"})
    }
})

AdminRoutes.post("/lectures/addlecture",checkAdmin, async (req,res)=>{
 // title, startDate, endDate, createdBy, courseId are coming from req.body
    // createdBy checked by a MW, once user is confirmed as Admin
    try{
        let lecture = await LectureModel.create(req.body)
        let course = await courseModel.findById(req.body.courseId);
        if(course){
            course.lectures.push(lecture._id);
            await course.save()
        }
        res.status(201).json({msg:"Lecture Created"})
    }catch(err){
        res.status(500).json({ msg: "Something went wrong" });
    }
})

module.exports = AdminRoutes;