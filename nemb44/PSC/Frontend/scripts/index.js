import { BASEURL } from "./baseurl.js";

let form = document.getElementById("form");
let resmessage = document.getElementById("msg")
form.addEventListener("submit",()=>{
    event.preventDefault();

    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;

    let userObj = {name,email,password};

    fetch(`http://localhost:8000/users/add-user`, {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(userObj)
    }).then((res)=> res.json()).then((data)=>{
        console.log(data)
        resmessage.textContent = data.msg;
        if(data.msg!="Something went wrong"){
          resmessage.style.color = "green"
        }else{
          resmessage.style.color = "red"
        }
        
        
    }).catch((err)=>{
        console.log("err in signup", err)
        resmessage.textContent = err.message;
        resmessage.style.red = "red"
    })
} )