const mongoose = require("mongoose");

const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected TO DB")
    }catch(err)
    {
        console.log("Error in Connecting DB")
    }
}

module.exports = connectToDB