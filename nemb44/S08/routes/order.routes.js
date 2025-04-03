const express = require("express");
const OrderModel = require("../models/order.model");
const UserModel = require("../models/user.model");

const OrderRouter = express.Router();


/// Add a order
OrderRouter.post("/add-order", async (req,res)=>{
    /// order details and userId is coming from req.body
    const {userId} = req.body;
    let user = await UserModel.findById(userId);
    if(!user){
        res.status(404).json({msg:"User Not Found..."})
        return 
    }

    try{
       let order = await OrderModel.create(req.body)
       /// onec order is created put the order id in userDocument
       user.orders.push(order._id);
       await user.save();
       /// putting and saving the user
       res.status(201).json({msg:"Order Created"})
    }catch (err) {
    //console.log(err)
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later...." });
  }
})

OrderRouter.put("/update-order/:orderId", async (req,res)=>{

    const {orderId} = req.params;
    let order = await OrderModel.findByIdAndUpdate(orderId, req.body);
    res.status(201).json({msg:"Order Updated"})
})


OrderRouter.delete("/delete-order/:orderId", async (req,res)=>{
    /// order id is coming from req.params
    /// I should search user from orderId, 
    /// remove orderId from orders array in User
    // then finally delete the order

    const {orderId} = req.params;

    let user = await UserModel.findOne({orders:{$in:[orderId]}});
    console.log(user);
    /// remove orderId in the order array in user Document
    let ans = await UserModel.findByIdAndUpdate(user._id, {$pull:{orders:orderId}}, {new:true})
   // console.log(ans)
    await OrderModel.findByIdAndDelete(orderId);

    res.status(200).json({msg:"Order is deleted"})
})

module.exports = OrderRouter;