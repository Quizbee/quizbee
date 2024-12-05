const Deck = require('../models/deck');

const getAllDecks = async (req, res, next) => {
  try {
    const user_id = req.user.id; // Get user ID from authenticated user
    const decks = await Deck.findAll({ where: { user_id } });
    res.json(decks);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

const getDeckById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id; // Get user ID from authenticated user
    const deck = await Deck.findOne({ where: { id, user_id } });
    if (!deck) {
      const error = new Error('Deck not found');
      error.name = 'NotFoundError';
      throw error;
    }
    res.json(deck);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

const createDeck = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const user_id = req.user.id; // Get user ID from authenticated user
    const newDeck = await Deck.create({ user_id, name, description });
    res.status(201).json(newDeck);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};
const updateDeck = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const user_id = req.user.id; // Get user ID from authenticated user
    const deck = await Deck.findOne({ where: { id, user_id } });
    if (!deck) {
      const error = new Error('Deck not found');
      error.name = 'NotFoundError';
      throw error;
    }
    if (name) deck.name = name;
    if (description) deck.description = description;
    await deck.save();
    res.json(deck);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

const deleteDeck = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id; // Get user ID from authenticated user
    const deck = await Deck.findOne({ where: { id, user_id } });
    if (!deck) {
      const error = new Error('Deck not found');
      error.name = 'NotFoundError';
      throw error;
    }
    await deck.destroy();
    res.json({ message: 'Deck deleted' });
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

module.exports = {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
};
