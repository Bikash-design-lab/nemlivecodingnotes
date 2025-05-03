const getIncomingTodo = (req,res,next)=>{
    /// checks the key title & description in req.body
    // if found, then allow next or else reject the response
    const {title, description} = req.body;
    if(!title || !description){
        // rejecting the req
        res.json({messsage:"Improper request"})
    }else{
        /// if found, body is of todos, hence allow to next Business Logic
        next()
    }
}

const TodoRouterMiddleware = (req,res,next)=>{
    console.log("This is todo router middleware");
    next()
}


module.exports = {getIncomingTodo,TodoRouterMiddleware}