// APIs for CRUD operations specific to teachers object
import express from "express";

// in-memory array for storing the teachers data
// ToDo: Change this to store in DB
const teachers = [];

// Router for the teachers
const teachersRouter = express.Router(); // sample instance of the server

// Read all the teachers
teachersRouter.get("/", (req, res) => {
  try {
    res.send({ msg: "Info about all the teachers", teachers });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Errors" });
  }
});

// Read info about a individual teacher
teachersRouter.get("/:teacherId", (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const stuData = teachers.find((stu) => stu.id === teacherId);

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
teachersRouter.post("/", (req, res) => {
  const teacherInfo = {
    ...req.body,
    id: Date.now().toString(),
    students: [],
  };

  try {
    teachers.push(teacherInfo);
    res.send({ msg: "Teacher Created Successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Update a single teacher
// use this api for assigning a teacher or changing info of the teacher
teachersRouter.put("/:teacherId", (req, res) => {
  const updateInfo = req.body;
  const teacherId = req.params.teacherId;

  try {
    // Logic to update a single teacher
    const index = teachers.findIndex((stu) => stu.id === teacherId);
    const stuObj = teachers.find((stu) => stu.id === teacherId);

    if (stuObj) {
      teachers[index] = {
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

// Delete a single teacher
teachersRouter.delete("/", (req, res) => {
  console.log("Info About Request", req);

  const teacherId = req.query.teacherId;

  console.log("Coming From Query param", teacherId);

  try {
    // Logic to delete a single teacher
    const index = teachers.findIndex((stu) => stu.id === teacherId);

    if (index !== -1) {
      teachers.splice(index, 1);
      res.send({ msg: "Student Deleted Successfully" });
    } else {
      res.status(404).send({ msg: "No Student Found" });
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

export default teachersRouter;
