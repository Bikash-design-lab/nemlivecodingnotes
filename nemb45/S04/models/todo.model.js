/// This model deals with Todo DB Interactions
const fs = require("fs")

const getData = ()=>{
     let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
      let todos = data.todos
     return {data, todos}
}


const addOrUpdateTodo = (data)=>{
    fs.writeFileSync("./db.json", JSON.stringify(data));
}

module.exports = {getData, addOrUpdateTodo}