var jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    //// how to ensure/validate token ???

   try{
     /// token will be sent through headers, generally behind the scene (which is not visible as req.body or params)
   let token = req.headers.authorization.split(" ")[1]
   ///console.log(token);
   if(!token){
       res.status(401).json({msg:"Token Not Found, Please Login Again"})
   }else{
       /// token present
       // we need to verify
       var decoded = jwt.verify(token, 'shhhhh');
       ///console.log("decoded", decoded)

       if(decoded){
           // token verified
           req.user = decoded.userId
           next()
       }else{
         res.status(401).json({msg:"Login Failed, Please Try Again Later"})
       }
   }
   }catch(err){
    res.status(500).json({msg:"Something went wrong, please try again later"})
   }
    
}


module.exports = authMiddleware;