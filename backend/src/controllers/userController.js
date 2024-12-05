// src/controllers/userController.js
const User = require('../models/user');
const Sequelize = require('sequelize');

const getUserData = async (req, res, next) => {
  try {
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
    next(error); // Propagate the error to the errorHandler middleware
  }
};

const updateUserData = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = req.user;

    if (username) {
      const existingUserByUsername = await User.findOne({
        where: { username, id: { [Sequelize.Op.ne]: user.id } },
      });
      if (existingUserByUsername) {
        const error = new Error('Username is already in use.');
        error.name = 'ConflictError';
        throw error;
      }
      user.username = username;
    }

    if (email) {
      const existingUserByEmail = await User.findOne({
        where: { email, id: { [Sequelize.Op.ne]: user.id } },
      });
      if (existingUserByEmail) {
        const error = new Error('Email is already in use.');
        error.name = 'ConflictError';
        throw error;
      }
      user.email = email;
    }

    if (password) user.password_hash = password;

    await user.save();
    res.json({ message: 'User data updated successfully', user });
  } catch (error) {
    console.error(error);
    next(error); // Propagate the error to the errorHandler middleware
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    await user.destroy();
    res.json({ message: 'User account deleted successfully.' });
  } catch (error) {
    console.error(error);
    next(error); // Propagate the error to the errorHandler middleware
  }
};

module.exports = {
  getUserData,
  updateUserData,
  deleteUser,
};
