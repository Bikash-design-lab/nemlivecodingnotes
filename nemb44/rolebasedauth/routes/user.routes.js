const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const UserRouter = express.Router();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;
//console.log(JWT_SECRETKEY)
UserRouter.post("/signup", async (req, res) => {
  /// name, email and password will be  coming form req.body as objects
  /// hash the password and store in db
  // hash?? use bycrypt
  // console.log(req.body);
  // res.send("Hi")
  try {
    const { password } = req.body;
    console.log(password);
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.

      if (err) {
        /// hashg generation failed
        res.status(500).json({ msg: "Something went wrong" });
      } else {
        /// hash generated
        await UserModel.create({ ...req.body, password: hash });
        res.status(201).json({ msg: "Signup Sucessfull" });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

UserRouter.post("/login", async (req,res)=>{
    /// email and password from req.body
    /// compare the password stored in db and password coming from req.body
    const {email, password} = req.body;
    let user = await UserModel.findOne({email});
    //console.log(user);
    bcrypt.compare(password, user.password, function(err, result) {
        // result == false
        if (err) {
            /// hashg generation failed
            res.status(500).json({ msg: "Something went wrong" });
        }else{
            /// comaparsion sucess
            if(result){
                /// password matches
                /// generate the token & send along with the res
                var token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRETKEY);
              //  console.log(token)
               res.status(200).json({msg:"Login Sucess", token})
            }else{
                // password not matching
                res.status(403).json({msg:"Wrong Password"})
            }
        }

    });

    
})

module.exports = UserRouter;
