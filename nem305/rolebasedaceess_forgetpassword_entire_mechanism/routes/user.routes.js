const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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
        var accesToken = jwt.sign(
          { userId: userData._id, role: userData.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1min" }
        );
        var refreshToken = jwt.sign(
          { userId: userData._id, role: userData.role },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({ msg: "Login Sucess...", accesToken, refreshToken });
      } else {
        res.send("Wrong Password...");
      }
    });
  }
});

UserRouter.post("/token", (req, res) => {
  /// which takes refresh token from req.headers
  /// decode the refresh token
  let refreshTtoken = req.headers.authorization.split(" ")[1];
  var decoded = jwt.verify(refreshTtoken, "shhhhh");
  if (decoded) {
    var accesToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1min" }
    );
    res.json({ accesToken });
  } else {
    /// push this refresh token into an collection blacklisted token
    /// send the response as please login again
  }
});

UserRouter.post("/forget_password", async (req, res) => {
  /// req.body is email
  /// need to send a reset link as a response
  /// link is hostname/route/token
  let userData = await UserModel.findOne({ email: req.body.email });
  var token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "20min",
  });

  const resetLink = `http://localhost:8080/users/reset_password/${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Admin 👻" <venubjms@gmail.com>', // sender address
    to: "venugopal.burli@masaischool.com", // list of receivers
    subject: "Password Reset", // Subject line
    text: `Click Here For Reset Password ${resetLink}`, // plain text body
    // html: "<h3>Please Finish within 10 mins</h3>", // html body
  });

  res.status(200).send("Password Reset Link is sent, please check the email");
});

UserRouter.get("/reset_password/:token", (req, res) => {
 // console.log(req.params.token);
 let token = req.params.token;
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/users/reset_password/${token}" method="POST" >
        <input name="password" type="text" placeholder="Enter New Password" />
        <input type="submit" value="Reset Password" />
    </form>
</body>
</html>`);
});

UserRouter.post("/reset_password/:token", async (req, res) => {
  /// req.body --> new password
  /// email comes from decoded token
  let token = req.params.token;
  var decoded = jwt.verify(token, "shhhhh");

  if(decoded){
    await UserModel.findByIdAndUpdate(decoded.userId, {password:req.body.password})
    res.json({msg:"Password Reset Sucess..."});
  }else{
    res.json({msg:"Please Try Agaian Later"})
  }
   /// call findById&Update
 
});
module.exports = UserRouter;
