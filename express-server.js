import express from "express";
import cors from "cors";

import connectToDb from "./db-utils/mongodb-connection.js";

// import studentsRouter from "./routes/students.js";
import teachersRouter from "./routes/teachers.js";
import studentsDbRouter from "./routes/students-db.js";
import teachersDbRouter from "./routes/teachers-db.js";
import connectViaMongoose from "./db-utils/mongoose-connection.js";

const server = express();

// Body Parsing Middleware
server.use(express.json());
// using the cors middleware to make our apis CORS complaint
server.use(cors());

// Connecting to the DB before server starts
// Top Level Await
await connectToDb();

// Mongoose Connection
await connectViaMongoose();

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
server.use("/students", studentsDbRouter);
server.use("/teachers", teachersDbRouter);

const port = 8000;

server.listen(port, () => {
  console.log(Date().toString(), "listening on port", port);
});
