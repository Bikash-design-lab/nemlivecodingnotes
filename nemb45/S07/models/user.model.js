const mongoose = require("mongoose");

//// Subdocument
const addressSchema = new mongoose.Schema({
    receiverName:{type:String, required:true},
    mobileNumber:{type:String, required:true},
    state:{type:String, required:true},
    district:{type:String, required:true},
    taluq:{type:String, required:true},
    area:{type:String, required:true},
    landMark:{type:String, required:true}, 
    pincode:{type:String, required:true},
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    addresses:[ addressSchema], /// Embedded Schema ,
    orders:[ // Nested Document
        {
        productName:String,
        amount:Number,
        delivery_status:Boolean,
        mode_of_payment:String
    }]
    /// Array of addresses, 1 user can have many addresss
})


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;



