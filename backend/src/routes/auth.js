const express = require('express');
const {
  userLoginSchema,
  userRegistrationSchema,
} = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  validateRequest(userRegistrationSchema),
  authController.register
);

router.post('/login', validateRequest(userLoginSchema), authController.login);

module.exports = router;
