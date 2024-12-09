const Joi = require('joi');

module.exports = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  if (Joi.isError(err)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.details.map((e) => e.message)[0],
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: err.message });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({ error: 'Not Found', message: err.message });
  }

  if (err.name === 'ConflictError') {
    return res.status(409).json({ error: 'Conflict', message: err.message });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Conflict',
      message: err.errors.map((e) => e.message)[0],
    });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res
      .status(500)
      .json({ error: 'Database Error', message: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
