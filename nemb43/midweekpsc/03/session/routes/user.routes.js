const express = require("express");
const userModel = require("../models/user.model");
const checkRole = require("../middlewares/checkRole");
const { addAdmin, registerUser, userLogin } = require("../controllers/user.controller");


const UserRoutes = express.Router();

/// add the user

UserRoutes.post("/addadmin",checkRole,addAdmin )

UserRoutes.post("/register",checkRole, registerUser )

UserRoutes.post("/login", userLogin)



module.exports = UserRoutes;