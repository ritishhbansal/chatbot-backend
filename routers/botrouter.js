const express = require("express");
const botRouter = express.Router();

const botController = require("../controllers/botController");

botRouter.post("/postSend", botController.message);

module.exports = botRouter;