const express = require("express");
const controller = require("../controller/orderController");

const router = express.Router();

router.post("/order/create", (req, res,next) => controller.create(req, res,next));
router.get("/order/:id", (req, res) => controller.findbyid(req, res));

module.exports = router;