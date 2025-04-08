const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const UserRouter = express.Router();

/// signup


UserRouter.post("/signup", async (req,res)=>{
    /// name, email and password from req.body
    //let user = await UserModel.create(req.body)
    ///XXXXXXX
    /// raw password should be hashed before storing into DB
    // bycrypt --> helps to hash and compare the password
    let myPlaintextPassword = req.body.password; /// raw password given by user
    console.log("raw password given by user", myPlaintextPassword)
    bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
        // Store hash in your password DB.

        if(err){
            res.status(500).json({msg:"Something went wrong, please try again later...."})
        }else{
            /// we got hashed password
            console.log("hashed pasdword", hash)
            // once hash is ready, store hashed password in db
            await UserModel.create({...req.body, password: hash})
            res.status(201).json({msg:"Signup Sucess...."})
        }
    });

    
})


UserRouter.post("/login", async (req,res)=>{
    /// email and raw password is req.body
    /// check whether user is present in DB
    /// if no---> he should signup
    /// if yes ---> compare the hashed password and raw password

    let user = await UserModel.findOne({email: req.body.email})
    if(!user){
        res.status(404).json({msg:"User Not Found, Please Signup....."})
    }else{
        /// user is present
        /// how to compare???
        let myPlaintextPassword = req.body.password; /// raw password
        let hash = user.password; /// hashed stored password in user document
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            // result == true
            if(err){
                res.status(500).json({msg:"Something went wrong, please try again later...."})
            }else{
                /// not a error
                console.log(result);

                if(result){
                    /// password comaprison sucesss
                    /// now generate a token and send with the response
                    var token = jwt.sign({ userId: user._id }, 'shhhhh');
                    res.status(200).json({msg:"Login Success", token})
                }else{
                    // comapariosn failed
                    res.status(401).json({msg: "Wrong Password"})
                }
            }
        });
    }
})

module.exports = UserRouter;