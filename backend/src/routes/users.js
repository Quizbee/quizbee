// src/routes/users.js
const express = require('express');
const { userUpdateSchema } = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');
const authenticateToken = require('../middleware/authenticate_token');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/me', authenticateToken, userController.getUserData);
router.put(
  '/me',
  [authenticateToken, validateRequest(userUpdateSchema)],
  userController.updateUserData
);
router.delete('/me', authenticateToken, userController.deleteUser);

module.exports = router;
