import isEqual from "lodash/isEqual.js";

import express from "express";
import { createFile, readFolder } from "./fs-utils.js";

const obj1 = {
  name: "Sanjay",
  role: "Developer",
  hobbies: ["coding", "sleeping"],
};
const obj2 = {
  hobbies: ["coding", "sleeping"],
  role: "Developer",
  name: "Sanjay",
};

console.log(isEqual(obj1, obj2));

const app = express();

// For creating a new file in the system
app.get("/create-file", (req, res) => {
  createFile();

  res.send({ msg: "File created successfully" });
});

// for reading the files from the filesystem
app.get("/read-files", (req, res) => {
  const files = readFolder("files");

  res.send(files);
});

app.listen(5000, () => {
  console.log("APIs Listening on 5000");
});
