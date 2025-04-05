const express = require("express");
const UserModel = require("../models/user.model");

const UserRouter = express.Router();
/// Routes 
UserRouter.post("/add-user", async (req,res)=>{
    try{
        let user = await UserModel.create(req.body);
        res.status(200).json({msg:"User Created", user})
    }catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
})

UserRouter.post("/login", async (req,res)=>{
    /// req.body -> email and password
    try{
        let user = await UserModel.findOne({email:req.body.email});
        if(user){
            // user found, check the password
            if(user.password == req.body.password){
                /// login sucess
                res.status(200).json({msg:"Login Sucess..", userdata:{name: user.name, userId: user._id, email:user.email}})
            }else{
                /// wrong password
                res.status(403).json({msg:"Wrong Password, Please Try Again....."})
            }
        }else{
            // user not found
            res.status(404).json({msg:"User Not Found Please Signup...."})
        }
        
    }catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
})


UserRouter.get("/all-users", async (req,res)=>{
    let users = await UserModel.find({}, {password:0})
    console.log(users)
    let userNames = users.map((el)=> {return {name: el.name, id: el._id}})
    res.json({userNames})
})
module.exports = UserRouter;