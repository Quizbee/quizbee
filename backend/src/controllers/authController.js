const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

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

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
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

    const token = generateToken(user);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    next(err); // Propagate the error to the errorHandler middleware
  }
};

module.exports = {
  register,
  login,
};
