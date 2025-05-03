const express = require("express");
const fs = require("fs")
const BlogRouter = express.Router();



/// Blogs Routes
BlogRouter.get("/allblogs", (req, res) => {
    // read the data from db.json through fs module, parse the data as readFile gives string
    /// send the todos as response
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    //console.log(data);
    let blogs = data.blogs;
    res.json({ message: "blogs List", blogs });
  });

module.exports = BlogRouter;