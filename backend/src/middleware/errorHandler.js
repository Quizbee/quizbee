module.exports = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details.map((d) => d.message),
    });
  }
  res.status(500).json({ error: 'Internal Server Error' });
};
