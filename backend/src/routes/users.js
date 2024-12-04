const express = require('express');

const { userUpdateSchema } = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');
const authenticateToken = require('../middleware/authenticate_token');
const User = require('../models/user');
const Sequelize = require('sequelize');

const router = express.Router();

// Route to get the authenticated user's data
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Return user data from the request (user was attached by auth middleware)
    const user = req.user;
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to update the authenticated user's data
router.put(
  '/me',
  [authenticateToken, validateRequest(userUpdateSchema)], // Validate request body
  async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = req.user; // Get authenticated user

      // Check if the username is already in use
      if (username) {
        const existingUserByUsername = await User.findOne({
          where: { username, id: { [Sequelize.Op.ne]: user.id } }, // Exclude current user
        });
        if (existingUserByUsername) {
          return res
            .status(400)
            .json({ message: 'Username is already in use.' });
        }
        user.username = username;
      }

      // Check if the email is already in use
      if (email) {
        const existingUserByEmail = await User.findOne({
          where: { email, id: { [Sequelize.Op.ne]: user.id } }, // Exclude current user
        });
        if (existingUserByEmail) {
          return res.status(400).json({ message: 'Email is already in use.' });
        }
        user.email = email;
      }

      // Update password if provided
      if (password) user.password_hash = password;

      // Save changes to the database
      await user.save();
      res.json({ message: 'User data updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

// Route to delete the authenticated user's data
router.delete('/me', authenticateToken, async (req, res) => {
  try {
    const user = req.user; // Get authenticated user

    // Delete the user from the database
    await user.destroy();
    res.json({ message: 'User account deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
