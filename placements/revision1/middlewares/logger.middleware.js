
const fs = require("fs");

const loggerMiddleware = (req,res,next)=>{
    /// logs the req data into logs.txt 
    let logData = `Url: ${req.url} |method: ${req.method} | Date: ${Date.now().toLocaleString()} \n`
    fs.appendFileSync("./logs.txt", logData);
    next()
}

module.exports = loggerMiddleware;