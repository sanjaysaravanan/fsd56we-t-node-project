// APIs for CRUD operations specific to students object
import express from "express";

// in-memory array for storing the students data
// ToDo: Change this to store in DB
const students = [];

// Router for the students
const studentsRouter = express.Router(); // sample instance of the server

// Read all the students
studentsRouter.get("/", (req, res) => {
  try {
    res.send({ msg: "Info about all the students", students });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Errors" });
  }
});

// Read info about a individual student
studentsRouter.get("/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  try {
    const stuData = students.find((stu) => stu.id === studentId);

    if (stuData) {
      res.send({ ...stuData });
    } else {
      res.status(404).send({ msg: "No Student Found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Create a new student
studentsRouter.post("/", (req, res) => {
  const studentInfo = {
    ...req.body,
    id: Date.now().toString(),
    teacherId: null,
  };

  try {
    students.push(studentInfo);
    res.send({ msg: "Student Created Successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Update a single student
// use this api for assigning a teacher or changing info of the student
studentsRouter.put("/:studentId", (req, res) => {
  const updateInfo = req.body;
  const studentId = req.params.studentId;

  try {
    // Logic to update a single student
    const index = students.findIndex((stu) => stu.id === studentId);
    const stuObj = students.find((stu) => stu.id === studentId);

    if (stuObj) {
      students[index] = {
        ...stuObj,
        ...updateInfo,
      };
      res.send({ msg: "Student Updated Successfully" });
    } else {
      res.status(404).send({ msg: "No Student Found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Delete a single student
studentsRouter.delete("/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  try {
    // Logic to delete a single student
    const index = students.findIndex((stu) => stu.id === studentId);

    if (index !== -1) {
      students.splice(index, 1);
      res.send({ msg: "Student Deleted Successfully" });
    } else {
      res.status(404).send({ msg: "No Student Found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

export default studentsRouter;
