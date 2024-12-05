const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      const error = new Error('Email already in use');
      error.name = 'ConflictError';
      throw error;
    }

    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      const error = new Error('Username already in use');
      error.name = 'ConflictError';
      throw error;
    }

    const newUser = await User.create({
      username,
      email,
      password_hash: password,
    });
    res
      .status(201)
      .json({ message: 'User created successfully', userId: newUser.id });
  } catch (err) {
    console.error(err);
    next(err); // Propagate the error to the errorHandler middleware
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const isPasswordValid = await User.validatePassword(
      password,
      user.password_hash
    );
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    next(err); // Propagate the error to the errorHandler middleware
  }
};

module.exports = {
  register,
  login,
};
