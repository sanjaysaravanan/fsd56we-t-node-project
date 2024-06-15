import { createServer } from "http";

const students = [];

const server = createServer((req, res) => {
  // res.end("<h1>Hello FSD56WE-TAMIL</h1>");
  if (req.method === "GET") {
    if (req.url === "/users") {
      res.end(
        JSON.stringify({
          message: "Users Data",
          users: [{ name: "sanjay" }, { name: "saravanan" }],
        })
      );
    } else {
      res.end(JSON.stringify({ message: "Hello FSD56WE-TAMIL" }));
    }
  } else if (req.method === "POST") {
    res.end(JSON.stringify({ message: "Data Created Successfully" }));
  }
});

const port = 8000;

server.listen(port, () => {
  console.log("Server listening on port " + port);
});
