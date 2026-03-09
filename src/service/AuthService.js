const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../config/jwt")
const AppError = require("../errors/appError")

/*
Simples para o desafio.
Usuário fixo.
*/
const user = {
  id: 1,
  username: "admin",
  password: "$2b$10$bpynPpTiLfS8VW53iCLNsOA.UAUYwd.wGaQ9Rm3m.tVkAIhx0.fEm"
}
// senha = admin123

class AuthService {

  async login(username, password) {

    if (username !== user.username) {
      throw new AppError("Usuário inválido",400)
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      throw new AppError("Senha inválida",404)
    }

    const token = jwt.sign(
      { userId: user.id },
      config.secret,
      { expiresIn: config.expiresIn }
    )

    return { token }

  }

}

module.exports = new AuthService()