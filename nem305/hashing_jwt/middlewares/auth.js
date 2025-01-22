var jwt = require('jsonwebtoken');

const authMw = (req,res,next)=>{
    /// if token present in req and verfied
    // then allow next 
    // how token comes in req??
    /// whether user puts token??
    // official place to send token is headers
    // else , send not Authorised as response
    let token = req.headers.authorization.split(" ")[1]
      // console.log(token);
    try{
        if(!token){
            res.status(401).json({msg:"User Not Logged In"})
        }else{
          // verify the token
          var decoded = jwt.verify(token, 'shhhhh');
          console.log(decoded);
          /// attaching the userId to the req.body , which is decrypted from token
          req.body.userId = decoded.userId;
          next()
        }
    }catch(err){
        console.log(err);
        res.status(401).json({msg:"Please Login Again"})
    }
    
    
  
   
}


module.exports = authMw