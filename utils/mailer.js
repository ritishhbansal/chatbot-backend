const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    auth: {
        user: "ritishbansal2006@gmail.com",
        pass: process.env.KEY
    }
});

const sendEmail = async (to, subject, mess) => {
    try {
        await transporter.sendMail({
            from: "<ritishbansal2006@gmail.com>",
            to: to,
            subject: subject,
            html: mess
        });
        console.log("EMail send successfully");
    } catch (err) {
        console.error("Error message", err.message);
    }
}

module.exports = sendEmail;