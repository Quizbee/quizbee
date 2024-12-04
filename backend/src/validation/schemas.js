const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8) // Minimum 8 characters
    .max(30) // Maximum 30 characters
    .pattern(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, 'password') // At least one uppercase letter and one number
    .required()
    .messages({
      'string.pattern.name':
        'Password must contain at least one uppercase letter and one number.',
    }),
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
  userSchema,
  deckSchema,
  flashcardSchema,
  deckFlashcardSchema,
};
