

const checkRole = (req,res,next)=>{
    //console.log(req.url)
 if(req.url == "/addadmin"){
    req.body.role = "admin";
    //console.log(req.body)
    next()
 }else if(req.url=="/register" && req.body.role !="admin"){
        /// if req.body.role is admin, then reject the request
        next()
    }else{
        // req.body.role is not admin
        res.status(403).json({msg:"Operation Not Allowed"})
    }
}

module.exports = checkRole;