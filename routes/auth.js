import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../db-utils/models.js";
import { db } from "../db-utils/mongodb-connection.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const userDetails = req.body;

    bcrypt.hash(userDetails.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send({ msg: "Something went wrong, please try again" });
      } else {
        const tempData = {
          ...userDetails,
          password: hash,
        };

        // store the above user into the DB
        const user = new userModel(tempData);

        await user.save(); // will validate the schema and insert the record into the DB

        res.send({ msg: "User created successfully" });
      }
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const creds = req.body; // email, password

    // check if the user email exists in the DB
    const userObj = await db
      .collection("users")
      .findOne({ email: creds.identifier }, { projection: { _id: 0, __v: 0 } });

    if (userObj) {
      // check the password matching
      bcrypt.compare(creds.password, userObj.password, (err, result) => {
        if (result) {
          const tempUser = { ...userObj };

          delete tempUser.password;
          res.send({ msg: "Login successful", user: { ...userObj } });
        } else {
          res.status(401).send({ msg: "Invalid username or password" });
        }
      });
    } else {
      res.status(400).send({ msg: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

export default authRouter;
