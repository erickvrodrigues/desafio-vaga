const express = require("express");
const controller = require("../controller/orderController");

const router = express.Router();

router.post("/order/create", (req, res) => controller.create(req, res));

module.exports = router;