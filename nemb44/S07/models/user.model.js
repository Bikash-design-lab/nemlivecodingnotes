const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    orderDate:String,
    orderValue:Number, 
    totalItems:Number,
    isDeilvered:Boolean
  })

const userSchema = new mongoose.Schema({
  name: {type:String,required:true },
  email:{type:String, unique:true, required:true},
  age: {type:Number, min:20, max:120},
  location: String,
  isMarried: Boolean,
  password:{type:String, default:"pass123"},
  gender:{type:String, enum:["male","female"]},
//   orders:[orderSchema],  /// Embedded Document
//   delieveryAddress:[{    /// Nested Document
//     state:String,
//     district:String,
//     taluk:String, 
//     area:String,
//     Street:String,
//     houseNo:String, 
//     recepientName:String, 
//     mobileNumber:String, 
//     pincode:String
//   }]
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
