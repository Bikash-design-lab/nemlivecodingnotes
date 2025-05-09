const express = require("express");
const PlanModel = require("../models/plan.model");
const PolicyModel = require("../models/policy.model");


const PolicyRouter = express.Router();

/// Add Plan


PolicyRouter.post("/add-plan", async(req,res)=>{
    // plan details are coming from req.body

    let plan  = await PlanModel.create(req.body);
    res.status(201).json({message:"Plan Added", plan})
})


PolicyRouter.post("/buy-policy", async(req,res)=>{
    /// planId, userId & other Plan Information are coming from req.body
    let policy = await PolicyModel.create(req.body);
    res.status(201).json({message:"Plan Added", policy})

})

PolicyRouter.get("/policy-details/:policyId", async(req,res)=>{
    /// planId, userId & other Plan Information are coming from req.body
    const {policyId} = req.params;
    let policy = await PolicyModel.findById(policyId).populate("policyHolderId").populate("planId");
    res.status(200).json({message:"Policy Details", policy})

})
module.exports = PolicyRouter;