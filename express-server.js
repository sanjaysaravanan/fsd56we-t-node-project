import express from "express";
import studentsRouter from "./routes/students.js";
import teachersRouter from "./routes/teachers.js";

const server = express();

// Body Parsing Middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send({ message: "Hello FSD56WE-TAMIL" });
});

server.get("/users", (req, res) => {
  res.send({
    message: "Users Data",
    users: [{ name: "sanjay" }, { name: "saravanan" }],
  });
});

server.post("/", (req, res) => {
  const body = req.body;

  console.log("Body Data from Request", body);

  res.send({ message: "Data Created Successfully from Express" });
});

// Use the router middleware into the server
//          base-path    Router Obje
server.use("/students", studentsRouter);
server.use("/teachers", teachersRouter);

const port = 8000;

server.listen(port, () => {
  console.log(Date().toString(), "listening on port", port);
});
