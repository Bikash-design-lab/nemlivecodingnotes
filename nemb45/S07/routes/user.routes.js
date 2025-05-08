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


UserRouter.patch("/add-address/:userId", async (req,res)=>{
    /// Address in object form is req.body
    const {userId} = req.params;
    let user = await UserModel.findById(userId);
      /// if user of userId present, I will get an object/document or else null
    if(!user){
     res.status(404).json({message:"User Not Found.."})
    }else{
        /// user found
        user.addresses.push(req.body);  /// just pushed in js memory
        await user.save()   /// updated entire User Document Once again in DB
        res.status(201).json({message:"Adddress Added"})
    }
})
/// Delete Address???, use $pull method and try on your own

module.exports = UserRouter;