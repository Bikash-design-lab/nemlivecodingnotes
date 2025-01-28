const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/" && req.method == "GET") {
    res.end("This is home page");
  } else if (req.url == "/add" && req.method == "POST") {
    console.log(req.body);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(body);
    });
    res.end("This is post request");
  } else {
    res.end("This is others page");
  }
});
server.listen(8080, () => {
  console.log("server started");
});
