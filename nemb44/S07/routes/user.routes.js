const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUserByID,
  deleteUserByID,
} = require("../controllers/user.controllers");
const UserModel = require("../models/user.model");

const UserRouter = express.Router();
UserRouter.get("/all-users", getAllUsers);

UserRouter.post("/add-user", addUser);

UserRouter.patch("/update-user/:id", updateUserByID);

UserRouter.delete("/delete-user/:id", deleteUserByID);


UserRouter.get("/age",async (req,res)=>{
    //let users = await UserModel.find({$and:[{gender:"female"}, {age:{$gte:30}}]});

   let users = await UserModel.find({location:{$ne:"Bangalore"}});
   //$ne
   res.json({users})
})


UserRouter.get("/all",async (req,res)=>{
    // .skip(number)--> skips cretain number of docuemnts
    // .limit(number) --> limits a particular number of document

    const {page, limit, order} = req.query;
    let sort = 1;
    if(order=="asc"){
        sort = 1 
    }else{
        sort = -1
    }
    let skipedItems = (page-1)*limit;
   let users = await UserModel.find().skip(skipedItems).limit(limit).sort({name:sort})

   res.json({users})
})
module.exports = UserRouter;


// operators >, >=, <, <=, and, or, not
// inc, dec, sum, avg, 
// 