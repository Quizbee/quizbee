const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

class User extends Model {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(); // Generate salt
    return bcrypt.hash(password, salt); // Hash password
  }

  static async validatePassword(inputPassword, storedPassword) {
    return bcrypt.compare(inputPassword, storedPassword); // Compare passwords
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: false, // Disable Sequelize's automatic timestamps

    hooks: {
      beforeCreate: async (user) => {
        user.password_hash = await User.hashPassword(user.password_hash);
      },
      beforeUpdate: async (user) => {
        user.password_hash = await User.hashPassword(user.password_hash);
      },
    },
  }
);

module.exports = User;
