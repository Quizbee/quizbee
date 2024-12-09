const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    next(error);
  }
  next();
};

module.exports = validateRequest;
