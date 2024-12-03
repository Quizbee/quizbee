const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Flashcard = sequelize.define(
  'flashcard',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    front: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    back: {
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
    timestamps: false,
  }
);

// Establish the relationship with User
Flashcard.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = Flashcard;
