const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

module.exports = errorMiddleware;
