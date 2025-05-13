const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
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
            var token = jwt.sign({ userId: user._id}, 'shhhhh');
            res.status(200).json({ message: "Login Sucess", token:token });
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
module.exports = UserRouter;
