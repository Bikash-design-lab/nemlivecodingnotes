const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
//const someOtherPlaintextPassword = 'not_bacon';

const UserRouter = express.Router();

UserRouter.post("/signup", (req, res) => {
  // req.body --> user details
  // add the user into UserModel
  // security ???
  /// hash the password
  try {
    let myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
      } else {
        let userData = { ...req.body, password: hash };
        //console.log(userData)
        await UserModel.create(userData);
        res.status(201).json({ msg: "Signup Sucess" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong while signing up..." });
  }
});

UserRouter.post("/login", async (req, res) => {
  /// email: v@gmailcom, V123
  // $2b$10$aC9Fmkh.Fov/4U0Rpmksz.DHXC0ToDI/xiS3BvCUos380VyaVB.B.

  let userData = await UserModel.findOne({ email: req.body.email });

  if (!userData) {
    // user not found in DB
    res.status(503).json({ msg: "User Not found, please signup" });
  } else {
    // user found

    let hash = userData.password;
    let myPlaintextPassword = req.body.password;
    // hash is hasshed password stored in db
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      // result == true
      if (err) {
        console.log(err);
      }
      //console.log(result)
      if (result) {
        /// hashed password and login password matched/compared
        /// need to send a jwt
        var token = jwt.sign({ userId: userData._id}, process.env.JWT_SECRET_KEY );
        res.json({msg:"Login Sucess...", token});
      } else {
        res.send("Wrong Password...");
      }
    });
  }
});

module.exports = UserRouter;
