/// this file is for refrence how purely mongoose work

const mongoose = require("mongoose");  /// importing 
// connecting Node with MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/nemb44").then(()=>{
    console.log("Connected to DB ")
}).catch((err)=>{
    console.log("err in connecting DB")
    console.log(err)
})

/// I need to interact with DB by doing some CRUD operations
/// Create Schema First
/// Schema means defining the structure of a document

// Schema is very very very very Important
const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    location:String,
    isMarried:Boolean
})

// once schema is created can I Interact with DB???
/// No, Model is responsible to interact with DB
/// create a model then, 

const UserModel = mongoose.model("User", userSchema)

/// User is collection Name

/// CRUD operations

///create a data
// db.Users.insertOne
//insertOne --> 
// .create(), new .save()
let newUser = UserModel.create({name:"Bob",age:53,location:"Bihar", isMarried:false });

newUser.then(()=>{
    console.log("Data added in User Collection in nemb44 Database")
}).catch((err)=>{
    console.log("Error in adding data")
})

// read the data

let users = UserModel.find();

users.then((data)=>{
    console.log("data", data)
}).catch((err)=>{
    console.log("Error in adding data")
})


