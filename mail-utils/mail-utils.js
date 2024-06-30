import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanjaysaravanan00007@gmail.com",
    pass: process.env.GMAIL_PASSWORD || "",
  },
});

const mailOptions = {
  from: "sanjaysaravanan00007@gmail.com",
  to: ["sanjaysaravanan1997@gmail.com"],
  subject: "Email Testing",
  text: "Sending Email are so easy with nodemailer & Gmail",
};

export { mailOptions, transporter };
