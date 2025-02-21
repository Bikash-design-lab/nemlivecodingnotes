const express = require("express");
const UserRoutes = require("./routes/user.routes");
const connecToDb = require("./configs/db.config");
const app = express();
app.use(express.json())
require("dotenv").config()
const PORT = process.env.PORT;
connecToDb()
app.get("/", (req,res)=>{
    try{
        res.status(200).json({msg:"This Is Test Route"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Something went wrong please try again later"});
    }
})

app.use("/users", UserRoutes)
app.listen(PORT, ()=>{
    console.log("Server Started")
})

