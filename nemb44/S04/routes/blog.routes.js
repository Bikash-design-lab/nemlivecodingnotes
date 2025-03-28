const express = require("express");
const fs = require("fs")

const blogsRouter = express.Router();

blogsRouter.get("/get-blogs", (req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
    let blogs = data.blogs;
    res.send({msg: "List of blogs", blogs})
    })


module.exports = blogsRouter;