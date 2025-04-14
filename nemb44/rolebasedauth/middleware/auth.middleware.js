var jwt = require('jsonwebtoken');
const { decode } = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

const authMiddleware = (role)=>{
   // console.log("role expected", role)
   /// role is array of allwoed people
    return (req,res, next)=>{
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
         res.status(500).json({msg:"Something went wrong, please login again"})
        }
     }
}
module.exports = authMiddleware;