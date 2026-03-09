const jwt = require("jsonwebtoken")
const config = require("../config/jwt")

function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado"
    })
  }

  const parts = authHeader.split(" ")

  if (parts.length !== 2) {
    return res.status(401).json({
      message: "Token mal formatado"
    })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      message: "Token mal formatado"
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {

    if (err) {
      return res.status(401).json({
        message: "Token inválido"
      })
    }

    req.userId = decoded.userId

    return next()

  })

}

module.exports = authMiddleware