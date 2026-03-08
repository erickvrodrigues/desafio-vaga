const express = require("express");
const controller = require("../controllers/OrderController");

const router = express.Router();

router.post("/order", (req, res) => controller.create(req, res));