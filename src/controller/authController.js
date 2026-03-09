const service = require("../services/AuthService")

class AuthController {

  async login(req, res, next) {

    try {

      const { username, password } = req.body

      const token = await service.login(username, password)

      res.json(token)

    } catch (error) {

      next(error)

    }

  }

}

module.exports = new AuthController()