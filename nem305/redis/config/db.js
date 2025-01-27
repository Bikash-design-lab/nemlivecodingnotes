
const mongoose = require("mongoose");

const connectToDb = async ()=>{
   try{
     await mongoose.connect("mongodb://127.0.0.1:27017/nem305");
     console.log("connected to db")
   }catch(err){
    console.log("Error in connecting DB")
   }
}

module.exports = connectToDb;
