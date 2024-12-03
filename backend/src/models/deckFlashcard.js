const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Deck = require('./deck');
const Flashcard = require('./flashcard');

const DeckFlashcard = sequelize.define(
  'deck_flashcard',
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
    flashcard_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    added_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
    unique: ['deck_id', 'flashcard_id'], // Ensure unique combinations of deck and flashcard
  }
);

// Establish relationships
DeckFlashcard.belongsTo(Deck, {
  foreignKey: 'deck_id',
  onDelete: 'CASCADE',
});

DeckFlashcard.belongsTo(Flashcard, {
  foreignKey: 'flashcard_id',
  onDelete: 'CASCADE',
});

Deck.hasMany(DeckFlashcard, {
  foreignKey: 'deck_id',
});

Flashcard.hasMany(DeckFlashcard, {
  foreignKey: 'flashcard_id',
});

module.exports = DeckFlashcard;
