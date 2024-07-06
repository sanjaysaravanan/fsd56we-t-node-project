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

// Simple Mail Options which can be overridden & used anytime
const mailOptions = {
  from: "sanjaysaravanan00007@gmail.com",
  to: [],
  subject: "Email Testing",
  text: "Sending Email are so easy with nodemailer & Gmail",
};

export { mailOptions, transporter };
