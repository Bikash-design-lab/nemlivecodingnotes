const express = require("express");
const userModel = require("../models/user.model");


const UserRoutes = express.Router();

/// add the user

UserRoutes.post("/add", async (req,res)=>{
    try{
        /// I should call the user model and i should insert the data into the model
        /// what is data??
        // data is coming from req.body
        //console.log(req.body)
        let user = await userModel.create(req.body)
        res.status(200).json({msg:"User Created", userData: user})
    }catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
})



module.exports = UserRoutes;