var jwt = require('jsonwebtoken');
const allowedLevels = require('../utils/allowedLevels');
const UserModel = require('../models/user.model');
require("dotenv").config();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

const authMiddleware = (role)=>{
   // console.log("role expected", role)
   /// role is array of allwoed people
    return async (req,res, next)=>{
        try{
         /// This mw check the token
        /// token is sent through headers
        let token = req.headers?.authorization?.split(" ")[1];
        // console.log(token);
         if(!token){
          res.status(404).json({msg:"token not found..."})
         }else{
          // token found
          // if token found, then check for its validity 
          var decoded = jwt.verify(token, JWT_SECRETKEY);
      
          if(decoded){
              /// everuything is fine
              // attach userId from decoded into req, so that the userId will be used in CRUD operations
              if(role.includes(decoded.role)){
                // level of logged in User
                // user's role level is leas than allowed level then next or else
                /// Insufficient permissions
                /// Try on your own instead of roles specified using strings
                req.userId = decoded.userId;
                // console.log("role passed", decoded.role)
                // now it is ready to move to next protected route
                next()
              }else{
                res.status(401).json({msg:"Not Authorised"})
              }
              
             
          }
      
         }
        }catch(err){
          //console.log(err.message)
          if(err.message == "jwt expired"){
            /// access token expired
            /// now its time to generate new access token 
            // I need userId and Role to generate new Token
            /// Let us decode refreshtoken, then i will get userId through which I will generate access token
            let refreshToken = req.headers?.refreshtoken?.split(" ")[1];
            ///console.log(refreshToken)
            var decodedRefresh = jwt.verify(refreshToken, JWT_SECRETKEY);
            //console.log(decodedRefresh);

            let user = await UserModel.findById(decodedRefresh.userId)
             if(user.refreshToken == refreshToken){
              var accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRETKEY, { expiresIn: 120 });
              //req.set("authorization", `Bearer ${accessToken}`);
              next()
             }else{
              res.status(500).json({msg:"Something went wrong, please login again"})
             }
          }
         
        }
     }
}
module.exports = authMiddleware;