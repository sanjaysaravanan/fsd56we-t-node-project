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

const userSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  mobile: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
  },
  dob: {
    type: "string",
    required: true,
  },
  role: {
    type: "string", // student or teacher
    required: true,
  },
});

const userModel = new model("user", userSchema, "users");

export { studentModel, teacherModel, userModel };
