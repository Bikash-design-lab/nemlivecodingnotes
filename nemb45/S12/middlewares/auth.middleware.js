var jwt = require("jsonwebtoken");

const authMiddleware = (...roleAllowed) => {
    // roleAllowed is an array 
  return (req, res, next) => {
    /// simply check the token is present
    // token present allow next or else Unauthorised
    try {
      //console.log(roleAllowed);
      // tokens are sent through headers as standard security practise
      const token = req.headers?.authorization?.split(" ")[1];
      /// console.log(token)
      if (!token){
        res.status(404).json({message:"Token Not Found"});
        return 
      }
      var decoded = jwt.verify(token, "shhhhh");
      console.log(decoded);
      //userId is present in decoded and also check the role prsent in decoded and role allowed in the route
      if (decoded && roleAllowed.includes(decoded.role)) {
        // attaching user details to the request for protected operations
        req.user = decoded.userId;
        req.userRole = decoded.role;
        next();
      } else {
        res.status(401).json({ message: "Unauthorised" });
      }

      //res.json({ message: "HI" });
    } catch (err) {
      res.status(400).json({ message: "Login Failed" , errmessage: err.message});
    }
  };
};

module.exports = authMiddleware;
