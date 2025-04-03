const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    orderDate:String,
    orderValue:Number, 
    totalItems:Number,
    isDeilvered:Boolean
  })


const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;