const fs = require("fs")
const express = require('express');
const app = express(); // imp

app.use(express.json()) /// function to sense json body -> body parser
app.get("/todos", (req,res)=>{
    // I will read the db.json file and give all the todos present in the db.json
    // I need a fs module to read the file

    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    //console.log(data)
    let todos = data.todos;
    res.send({msg:"List of todos", todos})
})
app.post("/add-todo", (req,res)=>{
    /// I should get new TODO from req
    ///console.log(req.body)
    let newTodo = req.body;
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    todos.push(newTodo)
    /// update the todoArray in the db.json
    console.log(data)
    fs.writeFileSync("./db.json",JSON.stringify(data) )
    res.send("Todo Added")
})

app.put("/update-todo/:id", (req,res)=>{
    let id = req.params.id;
    // req.body will be the updated todo coming
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    let index = todos.findIndex((el)=> el.id == id)
    if(index==-1){
        //no todo of id is found
        res.send(`No Todo of ${id} is found`)
    }else{
        let updatedTodos = todos.map((el,i)=>{
            if(el.id == id){
                return {...el, ...req.body}
            }else{
                return el
            }
        })

        data.todos = updatedTodos;
        fs.writeFileSync("./db.json",JSON.stringify(data) );
        res.send("Todo Updated")
    }
})

app.delete("/delete-todo/:id", (req,res)=>{
   // console.log(req.params)
   let id  = req.params.id;
   let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
   let todos = data.todos;
   let index = todos.findIndex((el)=> el.id == id)
   if(index==-1){
    //no todo of id is found
    res.send(`No Todo of ${id} is found`)
   }else{
    // todo found, remove from db.json and update the remaining
    // then send the response
    let filtredTodosArray = todos.filter((el,i)=> el.id!= id)
    /// replace todos array with filteredArray
    data.todos = filtredTodosArray;
    // again update in db.json
    fs.writeFileSync("./db.json",JSON.stringify(data) )
    res.send("Todo deleted")
   }
})
// app should listen through a port for incoming request

app.post("/append-data", (req,res)=>{
    /// req.body is todo object
    console.log(req.body)
   fs.appendFileSync("./data.txt",JSON.stringify(req.body)+"\n" )
   res.send("Data appended")
})

app.listen(8000, ()=>{
    console.log('Server started through the port 8080')
})
