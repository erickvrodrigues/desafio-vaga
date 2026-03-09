const service = require("../service/AuthService")

class AuthController {

  async login(req, res, next) {

    try {

      const { username, password } = req.body
       console.log("ok");
      const token = await service.login(username, password)
      

      res.json(token)

    } catch (error) {

      next(error)

    }

  }

}

module.exports = new AuthController()