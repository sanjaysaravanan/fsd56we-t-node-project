import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db-utils/models.js";
import { db } from "../db-utils/mongodb-connection.js";
import { transporter, mailOptions } from "../mail-utils/mail-utils.js";

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
          isVerified: false,
        };

        // store the above user into the DB
        const user = new userModel(tempData);

        await user.save(); // will validate the schema and insert the record into the DB

        const veifyToken = jwt.sign(
          { email: userDetails.email },
          process.env.JWT_SECRET,
          { expiresIn: "3m" }
        );

        const verifyLink = `${process.env.FE_URL}/verify-user-fe?token=${veifyToken}`;
        await transporter.sendMail({
          ...mailOptions,
          to: [...mailOptions.to, userDetails.email],
          subject: "Hey, Welcome to the Application !!!",
          text:
            "Welcome to Our Management Application, to Continue Please verify Your email by clicking on the below link, " +
            verifyLink,
        });

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

          const token = jwt.sign(tempUser, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRY_TIME,
          });

          res.send({ msg: "Login successful", userToken: token });
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

authRouter.get("/verify-user", async (req, res) => {
  const token = req.headers["authorization"];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const { email } = data;

    await db
      .collection("users")
      .updateOne({ email }, { $set: { isVerified: true } });
    res.send({ msg: "User Verified Successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ msg: "Link Expired" });
  }
});

export default authRouter;
