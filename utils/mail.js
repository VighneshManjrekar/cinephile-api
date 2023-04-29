const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, text }) => {
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.GMAIL_ID}>`,
    to,
    subject,
    text,
  };
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  })
  await transporter.sendMail(message);
};

module.exports = sendMail;
