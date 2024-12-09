const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'Username cannot be empty.',
    'string.alphanum': 'Username must only contain alphanumeric characters.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username cannot be longer than 30 characters.',
    'any.required': 'Username is required.',
    'string.base': 'Username must be a string.',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email cannot be empty.',
      'any.required': 'Email is required.',
      'string.base': 'Email must be a string.',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]*$/, 'password')
    .min(8)
    .max(30)
    .required()
    .messages({
      'string.pattern.name':
        'Password must include at least one uppercase letter and one number.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot be longer than 30 characters.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is required.',
      'string.base': 'Password must be a string.',
    }),
});

const userUpdateSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional().messages({
    'string.empty': 'Username cannot be empty.',
    'string.alphanum': 'Username must only contain alphanumeric characters.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username cannot be longer than 30 characters.',
    'string.base': 'Username must be a string.',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email cannot be empty.',
      'string.base': 'Email must be a string.',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]*$/, 'password')
    .min(8)
    .max(30)
    .optional()
    .messages({
      'string.pattern.name':
        'Password must include at least one uppercase letter and one number.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot be longer than 30 characters.',
      'string.empty': 'Password cannot be empty.',
      'string.base': 'Password must be a string.',
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email cannot be empty.',
      'any.required': 'Email is required.',
      'string.base': 'Email must be a string.',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]*$/, 'password')
    .min(8)
    .max(30)
    .required()
    .messages({
      'string.pattern.name':
        'Password must include at least one uppercase letter and one number.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot be longer than 30 characters.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is required.',
      'string.base': 'Password must be a string.',
    }),
});

const deckSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(500).optional(),
});

const flashcardSchema = Joi.object({
  deck_id: Joi.string().uuid().required(),
  front: Joi.string().max(500).required(),
  back: Joi.string().max(500).required(),
});

module.exports = {
  userRegistrationSchema,
  userUpdateSchema,
  userLoginSchema,
  deckSchema,
  flashcardSchema,
};
