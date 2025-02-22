const userModel = require("../models/user.model");

const checkAdmin = async (req, res, next) => {
  // req.body.userId is sent by client
  /// from UserModel check the user
  // if admin allow next
  // else provide a responsw as UnAuthorised

  try {
    let user = await userModel.findOne({ _id: req.body.createdBy });

    if (user && user.role == "admin") {
      next();
    } else {
      res.status(403).json({ msg: "Operation Not Allowed" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = checkAdmin;
