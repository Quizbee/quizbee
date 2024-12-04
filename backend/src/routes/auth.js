const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  userLoginSchema,
  userRegistrationSchema,
} = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');

const router = express.Router();

router.post(
  '/register',
  validateRequest(userRegistrationSchema),
  async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const newUser = await User.create({
        username,
        email,
        password_hash: password,
      });
      res
        .status(201)
        .json({ message: 'User created successfully', userId: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.post('/login', validateRequest(userLoginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await User.validatePassword(
      password,
      user.password_hash
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
