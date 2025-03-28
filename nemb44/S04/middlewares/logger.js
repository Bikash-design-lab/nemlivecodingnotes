const fs = require("fs");

const loggerMiddleware = (req,res,next)=>{
    /// this Middleware will just keep logs of all requests into logs.txt

    let data = `End-point: ${req.url} | Method: ${req.method} | Date-Time: ${Date.now()} \n`
    
    fs.appendFileSync("./logs.txt", data);
    next()
    
}

module.exports = loggerMiddleware;