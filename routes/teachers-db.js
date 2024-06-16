// APIs for CRUD operations specific to teachers object
import express from "express";

import { db } from "../db-utils/mongodb-connection.js";

// in-memory array for storing the teachers data
// ToDo: Change this to store in DB
// const teachers = [];

const collection = db.collection("teachers");

// Router for the teachers
const teachersDbRouter = express.Router(); // sample instance of the server

// Read all the teachers
teachersDbRouter.get("/", async (req, res) => {
  const { studentId } = req.query;
  try {
    if (studentId) {
      const teacher = await collection.findOne(
        { students: { $in: [studentId] } },
        { projection: { _id: 0 } }
      );

      res.send({
        msg: "Teacher Info for a student " + studentId,
        teacher,
      });
    } else {
      const teachers = await collection
        .find({}, { projection: { _id: 0 } })
        .toArray();
      res.send({ msg: "Info about all the teachers", teachers });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Errors" });
  }
});

// Read info about a individual teacher
teachersDbRouter.get("/:teacherId", async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const stuData = await collection.findOne(
      { id: teacherId },
      { projection: { _id: 0 } }
    );

    if (stuData) {
      res.send({ ...stuData });
    } else {
      res.status(404).send({ msg: "No Student Found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Create a new teacher
teachersDbRouter.post("/", async (req, res) => {
  const teacherInfo = {
    ...req.body,
    id: Date.now().toString(),
    students: [],
  };

  try {
    await collection.insertOne(teacherInfo);
    res.send({ msg: "Teacher Created Successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Update a single teacher
// use this api for assigning a teacher or changing info of the teacher
teachersDbRouter.put("/:teacherId", async (req, res) => {
  const updateInfo = req.body;
  const teacherId = req.params.teacherId;

  try {
    // Logic to update a single teacher
    const stuObj = await collection.findOne({ id: teacherId });

    if (stuObj) {
      await collection.updateOne(
        {
          id: teacherId,
        },
        {
          $set: updateInfo,
        }
      );
      res.send({ msg: "Teacher Updated Successfully" });
    } else {
      res.status(404).send({ msg: "No Teacher Found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Delete a single teacher
teachersDbRouter.delete("/", async (req, res) => {
  const teacherId = req.query.teacherId;

  try {
    // Logic to delete a single teacher
    const teacher = await collection.findOne({ id: teacherId });
    if (teacher) {
      await collection.deleteOne({ id: teacherId });
      res.send({ msg: "Teacher Deleted Successfully" });
    } else {
      res.status(404).send({ msg: "No Teacher Found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

export default teachersDbRouter;
