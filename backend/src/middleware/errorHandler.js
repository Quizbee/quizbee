module.exports = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  if (err.isJoi) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details.map((d) => d.message),
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
    return res
      .status(409)
      .json({ error: 'Conflict', details: err.errors.map((e) => e.message) });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res
      .status(500)
      .json({ error: 'Database Error', details: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
