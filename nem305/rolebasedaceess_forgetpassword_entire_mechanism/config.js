const mongoose = require("mongoose");


const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB")
    }catch(err){
        console.log("Failed to connect to DB")
    }
}

module.exports = connectToDb