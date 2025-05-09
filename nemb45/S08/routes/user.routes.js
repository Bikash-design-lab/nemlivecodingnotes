const express = require("express");
const UserModel = require("../models/user.model");

const UserRouter = express.Router();


UserRouter.post("/add-user", async(req,res)=>{
    /// name, email, age etc from req.body
    try{
        let user = await UserModel.create(req.body);
        res.status(201).json({message:"User Created", user})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"User Creation Failed"})
    }
})




module.exports = UserRouter;