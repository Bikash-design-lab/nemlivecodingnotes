const loogerMiddleware = (req,res,next)=>{
    console.log(req.url,req.method);
    next()
  }


  module.exports = {loogerMiddleware}