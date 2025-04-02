const UserModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    /// the below line should work after users getting from Database or after above line execution ended
    res.status(200).json({ msg: "List of Users", users });
  } catch (err) {
    //console.log(err)
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later...." });
  }
};

const addUser = async (req, res) => {
  /// req.body is user data, it is an object
  // that should be added in the Model
  try {
    let user = await UserModel.create({ ...req.body });
    res.status(201).json({ msg: "User Created", user });
  } catch (err) {
    // console.log(err)
    // console.log(err.errorResponse.code);
    if(err.errorResponse.code== 11000){
        res
      .status(201)
      .json({ msg: "User Arleady Registered, Please Login Directly" });
    }else{
        res
        .status(500)
        .json({ msg: "Something went wrong please try again later...." });
    }
  
  }
};

const updateUserByID = async (req, res) => {
  /// req.body is updated userdata
  try {
    const { id } = req.params;
    let updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({ msg: "User Updated", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later...." });
  }
};

const deleteUserByID = async (req, res) => {
  /// req.body is updated userdata
  try {
    const { id } = req.params;
    let updatedUser = await UserModel.findByIdAndDelete(id);
    res.status(201).json({ msg: "User Deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later...." });
  }
};

module.exports = { getAllUsers, addUser, updateUserByID, deleteUserByID };
