const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authController");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.post("/verifyemail", authController.verifyemail);
authRouter.post("/verifyotp", authController.enterOtp);
authRouter.post("/resetpassword", authController.newpass);

module.exports = authRouter;