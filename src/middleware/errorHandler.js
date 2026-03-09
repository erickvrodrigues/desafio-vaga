const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Erro interno do servidor';

  res.status(statusCode).json({ status: 'error', message });
};

module.exports = errorHandler;