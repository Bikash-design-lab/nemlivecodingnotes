const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const BlackListTokenModel = require("../models/blacklistToken.model");
require("dotenv").config();
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  try {
    /// email and password from req.body
    /// Hash the password and store in db

    const myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.

      if (err) {
        res.status(500).json({ message: "Error In Signup..." });
      } else {
        /// hash generated
        //// console.log(myPlaintextPassword, "----->", hash)
        await UserModel.create({ ...req.body, password: hash });
        res.json({ message: "Signup sucess" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error In Signup..." });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    /// email and password--> raw password
    /// compare raw password and hashed stored password
    const myPlaintextPassword = req.body.password;
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "User Not Found, Please Signup" });
    } else {
      /// user found
      const hash = user.password; // hash means stored hashed password
      bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
        // result == true

        if (err) {
          res.status(500).json({ message: "Error In Login..." });
        } else {
          /// result is true or false
          // result is true---> password matched
          /// result is false--> wrong password
          //console.log(myPlaintextPassword,hash,"--> result", result);
          if (result) {
            var accessToken = jwt.sign(
              { userId: user._id, role: user.role },
              "shhhhh",
              { expiresIn: 30 }
            );
            var refreshToken = jwt.sign(
              { userId: user._id, role: user.role },
              "shhhhh",
              { expiresIn: 60 }
            );

            // change nunber 2 in case of RBAC that add role in token
            res
              .status(200)
              .json({ message: "Login Sucess", accessToken, refreshToken });
          } else {
            res.status(401).json({ message: "Wrong Password" });
          }
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error In Login..." });
  }
});

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", /// host of email services provider, smtp -> simple mail transfer protocol
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GOOGLE_USER_EMAIL,
    pass: process.env.GOOGLE_USER_PASSWORD,
    /// password is not directly my google account password, then how??
    // we need to create an App in google, whose password will be used here
    // Google ensures security, this app passoword accessible only to the app, not to the entire Google Account
  },
});

UserRouter.get("/sendmail", async (req, res) => {
  const info = await transporter.sendMail({
    from: '"Venugopal Burli" ',
    to: "venugopal.burli@masaischool.com, dattatraya.samal@gmail.com,tusharjaiswal8090@gmail.com,zajampratik@gmail.com,patilsharu11@gmail.com ",
    subject: "This is testing email",
    text: "Hello world in Text?", // plain‑text body
    // html: "<b>Hello world in Html</b>", // HTML body
  });
  res.status(200).json({ message: "Email Sent" });
});

UserRouter.post("/forget-password", async (req, res) => {
  /// accept email as body

  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({ message: "User Not Found, Please Signup..." });
  } else {
    /// user found
    // send the reset password link
    // how to create password link???
    let resetPasswordToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 300 }
    );

    let resetPasswordLink = `http://localhost:8000/users/reset-password?token=${resetPasswordToken}`;
    await transporter.sendMail({
      from: '"Venugopal Burli" ',
      to: user.email,
      subject: "Password Reset ",
      html: `<h5>This is password reset link, which expires within 5mins</h5>
    <h4>Link To Reset ${resetPasswordLink}</h4>`,
    });
    res
      .status(200)
      .json({ message: "Password Reset Link is sent to registered mail" });
  }
});

UserRouter.post("/reset-password", async (req, res) => {
  try {
    const { token } = req.query;

    decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      /// user verfified
      let user = await UserModel.findById(decoded.userId);

      // user.password = req.body.newPassword;

      bcrypt.hash(req.body.newPassword, saltRounds, async function (err, hash) {
        // Store hash in your password DB.

        if (err) {
          res.status(500).json({ message: "Error In Reset..." });
        } else {
          /// hash generated
          //// console.log(myPlaintextPassword, "----->", hash)
          user.password = hash;
          await user.save();
          await BlackListTokenModel.create({token})
          res.json({ message: "Password Reset Sucessfull" });
        }
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in Reset", errmessage: err.message });
  }
});
module.exports = UserRouter;
