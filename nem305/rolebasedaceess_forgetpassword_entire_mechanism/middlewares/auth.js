var jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMw = (role)=>{
  /// role is array of allowed roles
  return async (req, res, next) => {
    /// if token present in req and verfied
    // then allow next
    // how token comes in req??
    /// whether user puts token??
    // official place to send token is headers
    // else , send not Authorised as response
    let token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    try {
      if (!token) {
        res.status(401).json({ msg: "User Not Logged In" });
      } else {
        // verify the token
        var decoded = jwt.verify(token, "shhhhh");
        ///console.log(decoded);
        if(role.includes(decoded.role)){
          /// attaching the userId to the req.body , which is decrypted from token
          req.body.userId = decoded.userId;
          req.role = decoded.role;
          next();
        }else{
         res.status(401).send("Unauthorised")
        }
       
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({ msg: "Please Login Again" });
    }
  };
}

module.exports = authMw;
