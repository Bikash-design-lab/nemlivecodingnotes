const express = require("express");
const nodemailer = require("nodemailer");
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
    bcrypt.compare(password, user.password, async function(err, result) {
        // result == false
        if (err) {
            /// hashg generation failed
            res.status(500).json({ msg: "Something went wrong" });
        }else{
            /// comaparsion sucess
            if(result){
                /// password matches
                /// generate the token & send along with the res
                var accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRETKEY);
                var refreshToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRETKEY,{ expiresIn: '2d' });
                user.refreshToken = refreshToken;
                /// save refreshtoen in DB for future reference
                await user.save()
                //  console.log(token)
               res.status(200).json({msg:"Login Sucess", accessToken, refreshToken})
            }else{
                // password not matching
                res.status(403).json({msg:"Wrong Password"})
            }
        }

    });

    
})

UserRouter.post("/sendmail", async (req,res)=>{
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  /// changes depending upon your host email
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.LOGIN_EMAIL,
      pass: process.env.LOGIN_EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Venugopal Burli 👻"', // sender address
    to: "venugopal.burli@masaischool.com,zajampratik@gmail.com,tusharjaiswal8090@gmail.com,irsuhail2000@gmail.com,ranvishwakarma122@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  res.send("Mail Sent")
})


UserRouter.post("/forgetpassword", async (req,res)=>{
  /// email of the user is req.body
  /// check whether user is present 
  /// if yes, send him a resetpassword link
  /// if no, User Not Found

  let user = await UserModel.findOne({email:req.body.email});
  if(!user){
    res.status(404).json({msg:"User Not Found, Please Signup"})
  }else{
    /// user found
    /// generate reset password link
    /// http://localhost:3000/users/reset-password?token=<jwtToken>
    //console.log(user)
    var token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRETKEY, { expiresIn: 20*60 });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",  /// changes depending upon your host email
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.LOGIN_EMAIL,
        pass: process.env.LOGIN_EMAIL_PASSWORD,
      },
    });
    let resetLink = `http://localhost:3000/users/reset-password?token=${token}`;
    
    const info = await transporter.sendMail({
      from: '"Venugopal Burli 👻"', // sender address
      to: user.email, // list of receivers
      subject: "Reset Password", // Subject line
      html: `<h3>${resetLink}</h3>
      <p>Please Note, This Link Expires within 20 mins</p>`, // html body
    });
    res.status(200).json({msg:"Reset Password Link Sent To Email", resetLink})

  }
})


UserRouter.post("/reset-password", async (req,res)=>{
  // console.log(req.query);
  /// new password is coming from req.body
  const {token} = req.query;
  var decoded = jwt.verify(token, JWT_SECRETKEY);
  console.log(decoded)
  let newPassword = req.body.newPassword;
  try{
    if(decoded){
      //// token verified
      /// update the new password in the user document
      let user = await UserModel.findById(decoded.userId);
      //console.log(user)
      user.password = newPassword;
      await user.save()
      res.send("Password Reset Sucessfull")
    }
  }catch(err){
    console.log(err)
    res.status(500).json({msg:"Something went wrong, please try again later"})
  }
  
})
module.exports = UserRouter;
