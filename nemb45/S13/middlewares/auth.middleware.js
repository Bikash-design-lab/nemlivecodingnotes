var jwt = require("jsonwebtoken");
const BlackListTokenModel = require("../models/blacklistToken.model");

const authMiddleware = (...roleAllowed) => {
    // roleAllowed is an array 
    let decoded;
  return async (req, res, next) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token){
        res.status(404).json({message:"Token Not Found"});
        return 
      }
      let blacklistTokenStatus = await BlackListTokenModel.exists({token})
      /// exists returns document or null
      if(blacklistTokenStatus){
        res.status(401).json({message:"Black Listed Token"});
        return 
      }
      decoded = jwt.verify(token, "shhhhh");
    } catch (err) {
      if(err.message=="jwt expired"){
        /// access token expired, generate new access token
        /// we need refresh token to generate access token
        let refreshToken = req.headers?.refreshtoken?.split(" ")[1];
    
        if(!refreshToken){
          res.status(404).json({message:"Token Not Found, Login Again"})
          return 
        }else{
          // verify refreshtoken and generate access token 
          let refreshDecoded = jwt.verify(refreshToken, "shhhhh");
          let newAccesstoken = jwt.sign({ userId: refreshDecoded.userId, role:refreshDecoded.role}, 'shhhhh',{ expiresIn: 30 });
          //req.set({"authorization":`Bearer ${newAccesstoken}`})
          decoded = jwt.verify(newAccesstoken, "shhhhh");
        }
      }else{
        res.status(400).json({ message: "Login Failed" , errmessage: err.message});
      }
    }
    /// Token either fron try block or from catch block will be verfied in RBAC only once
    if (decoded && roleAllowed.includes(decoded.role)) {
        // attaching user details to the request for protected operations
        req.user = decoded.userId;
        req.userRole = decoded.role;
        next();
      } else {
        res.status(401).json({ message: "Unauthorised" });
      }
  };
};

module.exports = authMiddleware;
