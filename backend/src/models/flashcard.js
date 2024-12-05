const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Deck = require('./deck');

class Flashcard extends Model {}

Flashcard.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    deck_id: {
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
  },
  {
    sequelize,
    modelName: 'flashcard',
    tableName: 'flashcards',
    timestamps: false,
  }
);

// Establish the relationship with Deck
Flashcard.belongsTo(Deck, {
  foreignKey: 'deck_id',
  onDelete: 'CASCADE',
});

Deck.hasMany(Flashcard, {
  foreignKey: 'deck_id',
});

module.exports = Flashcard;
