import { BASEURL } from "./baseurl.js";

let cont = document.getElementById("container")
let userData = JSON.parse(localStorage.getItem("userData"))

console.log(userData)


async function getData(){
    ///get-todos/users/:userId
    let res = await fetch(`${BASEURL}/todos/get-todos/users/${userData.userId}`)
    let data = await res.json();
    console.log("data from BE", data)
    displayData(data.todos)

}


getData()


function displayData(arr){
    arr.map((el,i)=>{
        let card = document.createElement("div");
        let title = document.createElement("h4")
        let status = document.createElement("h4")

        title.textContent = `title: ${el.title}`;
        status.textContent = `status: ${el.status==true? "Completed":"Pending"}`
       
        let addAssignee = document.createElement("button");
        addAssignee.textContent = "Add Assignee";


        card.append(title,status,addAssignee)
        cont.append(card)
    })
}