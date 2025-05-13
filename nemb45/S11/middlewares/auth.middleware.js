const authMiddleware = (req,res,next)=>{
    /// simply check the token is present
    // token present allow next or else Unauthorised
    const token = req.body.token;

    if(token){
        next()
    }else{
        res.status(400).json({message:"Not Allowed"})
    }
}

module.exports = authMiddleware;