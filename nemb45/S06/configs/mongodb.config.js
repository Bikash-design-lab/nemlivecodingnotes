/// How to connect 

const mongoose = require('mongoose');


const connecToDb = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/nemb45").then(()=>{
        console.log("Connected To DB")
    }).catch((err)=>{
        console.log("Failed to Connect To DB")
    })
}

module.exports = connecToDb;