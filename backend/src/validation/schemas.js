const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
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
  username: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
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
      'any.required': 'Password is required.',
      'string.base': 'Password must be a string.',
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

const deckSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().max(500).optional(),
});

const flashcardSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  front: Joi.string().max(500).required(),
  back: Joi.string().max(500).required(),
});

const deckFlashcardSchema = Joi.object({
  deck_id: Joi.string().uuid().required(),
  flashcard_id: Joi.string().uuid().required(),
});

module.exports = {
  userRegistrationSchema,
  userUpdateSchema,
  userLoginSchema,
  deckSchema,
  flashcardSchema,
  deckFlashcardSchema,
};
