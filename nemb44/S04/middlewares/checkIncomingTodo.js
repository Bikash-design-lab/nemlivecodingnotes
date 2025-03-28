const checkIncomingTodo = (req,res,next)=>{
    /// name and status are only allowed from req.body
    const {name, status} = req.body;
    if(!name && !status){
      // name and status are not present in req.body, which means it is not todo body
      res.status(406).send("This Data is not allowed")
    }else{
      // name and status is present in the req.body
      next()
    }
  }


module.exports = checkIncomingTodo;