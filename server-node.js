const http = require("http");

// localhost to run the files into the local machine

const hostname = "127.0.0.1";

// ports are just like the gateway to listen to the request come in and to respond that request

const port = 3000;

const server = http.createServer((req, res) => {
  // if everything is good
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello response ended");
  } else if (req.url === "/ice-tea") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Thanks for ordering the ice tea, its really hot");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not Found");
  }
});

// To listen the server that we have created

server.listen(port, hostname, () => {
  console.log(`server is listening at http://${hostname}:${port}`);
});
