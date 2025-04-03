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

    const {name,email,location, page, limit, order,sort} = req.query;
    /// 
    let filter = {}
    if(name){
      filter.name = name;
    }
    ////
    if(email){
        filter.email = email;
    }
    //// 
    if(location){
        filter.location = location;
    }
    let sortingElement = sort || "name"
    if(order=="asc"){
        orderingType = 1 
    }else{
        orderingType = -1
    }
    let skipedItems = (page-1)*limit;

   let users = await UserModel.find(filter).skip(skipedItems).limit(limit).sort({[sortingElement]:orderingType})

   res.json({users})
})


UserRouter.get("/:userId", async (req,res)=>{
    /// userId is coming fronm req.params
    const {userId} = req.params;
    let user = await UserModel.findById(userId).populate("orders")
    res.status(200).json({msg:"User Details", user})
})
module.exports = UserRouter;


// operators >, >=, <, <=, and, or, not
// inc, dec, sum, avg, 
// 