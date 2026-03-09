const express = require("express")
const controller = require("../controller/authController")

const router = express.Router()

router.post("/login", (req, res, next) =>
  controller.login(req, res, next)
)

module.exports = router