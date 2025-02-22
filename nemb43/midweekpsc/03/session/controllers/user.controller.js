const userModel = require("../models/user.model")


const  addAdmin = async (req,res)=>{
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
}


const registerUser = async (req,res)=>{
    try{
        /// I should call the user model and i should insert the data into the model
        /// what is data??
        // data is coming from req.body
        //console.log(req.body)
        /// check whether user is present in the system, if yes, then send to login 
        // or register the user
        let user = await userModel.findOne({email: req.body.email})
        if(user){
            res.status(200).json({msg:"User Already Registered Please Login"})
        }else{
            let user = await userModel.create(req.body)
            res.status(200).json({msg:"User Created", userData: user})
        }
      
    }catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
}

const userLogin = async (req,res)=>{
    try{
        /// check whether user is present in the system, if yes, then login or
        /// send res as please register
        // email and password are coming as req
        let user = await userModel.findOne({email: req.body.email})
        if(user){
            /// user present, check the password
            if(user.password == req.body.password){
                res.status(200).json({msg:"Login Sucess"})
            }else{
                res.status(404).json({msg:"Wrong Password"})
            }
        }else{
            res.status(404).json({msg:"User Not Found, Please Register"})
        }
       
    }catch(err){
        res.status(500).json({msg:"Something went wrong"})
    }
}

module.exports = {addAdmin, registerUser,userLogin}