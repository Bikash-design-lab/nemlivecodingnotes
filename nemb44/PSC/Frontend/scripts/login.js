import { BASEURL } from "./baseurl.js";

let form = document.getElementById("form");
let resmessage = document.getElementById("msg");
form.addEventListener("submit", () => {
  event.preventDefault();
  let email = form.email.value;
  let password = form.password.value;

  let userObj = { email, password };

  fetch(`${BASEURL}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userObj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resmessage.textContent = data.msg;
      if (data.msg != "Something went wrong") {
        resmessage.style.color = "green";
      } else if (data.msg == "Wrong Password, Please Try Again.....") {
        resmessage.style.color = "red";
      } else {
        resmessage.style.color = "red";
      }

      if(data.msg=="Login Sucess.."){
        localStorage.setItem("userData", JSON.stringify(data.userdata));
        window.location.href = "./todo.html"
      }
    })
    .catch((err) => {
      console.log("err in signup", err);
      resmessage.textContent = err.message;
      resmessage.style.red = "red";
    });
});
