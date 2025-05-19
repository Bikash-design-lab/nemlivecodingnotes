// token = localStorage.getItem("token")
// It is just bummy frontend fetch request to show how token is passed in headers
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIzNWE5YWNjMzliMWQyNWNlMzI5ZjIiLCJpYXQiOjE3NDc2NjM5Mjd9.3M9koZi2Ey-RSryB6mAhyyp99XjyIuQ27BA4Vaxw0XE"
function getData(){
    fetch("http://localhost:8000/todos/alltodos", {
        method:'GET',
        headers:{
            "Authorization":`Bearer ${token}`
        }
    }).then((res)=> res.json()).then((data)=>{
        console.log(data)
    })
}

getData()