/// How to connect 

const mongoose = require('mongoose');


const connecToDb = ()=>{
    console.log("Value from .env",process.env.MONGO_URI )
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected To DB")
    }).catch((err)=>{
        console.log("Failed to Connect To DB")
    })
}

module.exports = connecToDb;