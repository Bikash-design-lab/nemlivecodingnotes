const mongoose = require("mongoose");


const connecToDB = async ()=>{
    try{
      await mongoose.connect('mongodb://127.0.0.1:27017/nemb44')
      console.log("Connected To Db")
    }catch(err){
        console.log("Error in connecting DB")
    }
}

module.exports = connecToDB;