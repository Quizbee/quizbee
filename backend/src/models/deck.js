const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Deck extends Model {}

Deck.init(
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
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'deck',
    tableName: 'decks',
    timestamps: false,
  }
);

// Establish the relationship with User
Deck.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Deck, {
  foreignKey: 'user_id',
});

module.exports = Deck;
