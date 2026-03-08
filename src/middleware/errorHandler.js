function errorHandler(err, req, res, next) {

  const status = err.statusCode || 500

  const response = {
    success: false,
    error: {
      message: err.message || "Erro interno do servidor",
      status: status,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    }
  }

  res.status(status).json(response)
}

module.exports = errorHandler