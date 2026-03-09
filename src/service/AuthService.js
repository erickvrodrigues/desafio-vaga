const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../config/jwt")

/*
Simples para o desafio.
Usuário fixo.
*/
const user = {
  id: 1,
  username: "admin",
  password: "$2b$10$6aC2jF6ZX0F2Pdh9vywgEuGqORdzdrIW6DCeU44yWiNysGEKMluS2"
}
// senha = admin123

class AuthService {

  async login(username, password) {

    if (username !== user.username) {
      throw new Error("Usuário inválido")
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      throw new Error("Senha inválida")
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