import express from "express";

import { db } from "../db-utils/mongodb-connection.js";

const studentsDbRouter = express.Router();

const collection = db.collection("students");

// Create a new student
studentsDbRouter.post("/", async (req, res) => {
  try {
    const payload = req.body;

    await collection.insertOne({
      ...payload,
      id: Date.now().toString(),
      teacherId: null,
    });

    res.status(201).send({ msg: "Student Created Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Get all the students
studentsDbRouter.get("/", async (req, res) => {
  try {
    const students = await collection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    res.send({ msg: "Info about all the Students", students });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Get a single Student
studentsDbRouter.get("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await collection.findOne(
      { id: studentId },
      { projection: { _id: 0 } }
    );

    res.send({ msg: "Info about the single student " + studentId, student });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Update a single student
studentsDbRouter.put("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const payload = req.body;

    await collection.updateOne(
      {
        id: studentId,
      },
      {
        $set: payload,
      }
    );

    res.send({ msg: "Updated Student Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// delete a single student
studentsDbRouter.delete("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    await collection.deleteOne({
      id: studentId,
    });

    res.send({ msg: "Deleted Student Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

export default studentsDbRouter;
