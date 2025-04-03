/// this file is for refrence how purely mongoose work

const mongoose = require("mongoose");  /// importing 
// connecting Node with MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/nemb44").then(()=>{
    console.log("Connected to DB ")
}).catch((err)=>{
    console.log("err in connecting DB")
    console.log(err)
})




/// User is collection Name

/// CRUD operations

///create a data
// db.Users.insertOne
//insertOne --> 
// .create(), new .save()
// let newUser = UserModel.create({name:"Bob",age:53,location:"Bihar", isMarried:false });

// newUser.then(()=>{
//     console.log("Data added in User Collection in nemb44 Database")
// }).catch((err)=>{
//     console.log("Error in adding data")
// })

// read the data

let users = UserModel.find();

users.then((data)=>{
    console.log("data", data)
}).catch((err)=>{
    console.log("Error in adding data")
})


