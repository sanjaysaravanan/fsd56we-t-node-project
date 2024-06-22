import { Schema, model } from "mongoose";

const student = new Schema({
  name: {
    type: "string",
    required: true,
  },
  id: {
    type: "string",
    required: true,
  },
  class: {
    type: "string",
    required: true,
  },
  teacherId: {
    type: "string",
  },
  image: {
    type: "string",
    required: true,
  },
});

const studentModel = new model("student", student, "students");

const teacherSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  id: {
    type: "string",
    required: true,
  },
  class: {
    type: "string",
    required: true,
  },
  students: {
    type: Array,
    default: [],
  },
  image: {
    type: "string",
    required: true,
  },
});
const teacherModel = new model("teacher", teacherSchema, "teachers");

export { studentModel, teacherModel };
