const express = require("express");
const controller = require("../controller/orderController");

const router = express.Router();

router.post("/order/create", (req, res,next) => controller.create(req, res,next));
router.get("/order/:id", (req, res,next) => controller.findbyid(req, res,next));
router.put("/order/:id", (req, res,next) => controller.update(req, res,next));
router.get("/order", (req, res,next) => controller.findAll(req, res,next));
router.delete("/order/:id", (req, res,next) => controller.findAll(req, res,next));

module.exports = router;