import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import connectToDb from "./db-utils/mongodb-connection.js";

// import studentsRouter from "./routes/students.js";
import teachersRouter from "./routes/teachers.js";
import studentsDbRouter from "./routes/students-db.js";
import teachersDbRouter from "./routes/teachers-db.js";
import connectViaMongoose from "./db-utils/mongoose-connection.js";
import authRouter from "./routes/auth.js";

const server = express();

// Body Parsing Middleware
server.use(express.json());
// third party middleware
// using the cors middleware to make our apis CORS complaint
server.use(cors());

dotenv.config();

// Custom Middleware
const logger = (req, res, next) => {
  console.log(new Date().toString(), req.url, req.method);
  next();
};

const authAPI = (req, res, next) => {
  const token = req.headers["authorization"];

  if (Boolean(token)) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

const authWithRole = (role) => (req, res, next) => {
  const token = req.headers["authorization"];
  // we should also ensure role is teacher

  // get the payload/data from the token
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    console.log(data);

    if (data.role === role) {
      next();
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (err) {
    // err
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// using the custom middleware
server.use(logger);

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
server.use("/students", authAPI, studentsDbRouter);
server.use("/teachers", authWithRole("teacher"), teachersDbRouter);
server.use("/auth", authRouter);

const port = 8000;

server.listen(port, () => {
  console.log(Date().toString(), "listening on port", port);
});
