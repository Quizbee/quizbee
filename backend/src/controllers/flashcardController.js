const Flashcard = require('../models/flashcard');
const Deck = require('../models/deck');

const getFlashcardsByDeck = async (req, res, next) => {
  try {
    const { deck_id } = req.params;
    const deck = await Deck.findByPk(deck_id);
    if (!deck) {
      const error = new Error('Deck not found');
      error.name = 'NotFoundError';
      throw error;
    }
    if (deck.user_id !== req.user.id) {
      const error = new Error('Unauthorized');
      error.name = 'UnauthorizedError';
      throw error;
    }
    const flashcards = await Flashcard.findAll({ where: { deck_id } });
    res.json(flashcards);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

const getFlashcardById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findByPk(id);
    if (!flashcard) {
      const error = new Error('Flashcard not found');
      error.name = 'NotFoundError';
      throw error;
    }
    const deck = await Deck.findByPk(flashcard.deck_id);
    if (deck.user_id !== req.user.id) {
      const error = new Error('Unauthorized');
      error.name = 'UnauthorizedError';
      throw error;
    }
    res.json(flashcard);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

const createFlashcard = async (req, res, next) => {
  try {
    const { deck_id, front, back } = req.body;
    const deck = await Deck.findByPk(deck_id);
    if (!deck) {
      const error = new Error('Deck not found');
      error.name = 'NotFoundError';
      throw error;
    }
    if (deck.user_id !== req.user.id) {
      const error = new Error('Unauthorized');
      error.name = 'UnauthorizedError';
      throw error;
    }
    const newFlashcard = await Flashcard.create({ deck_id, front, back });
    res.status(201).json(newFlashcard);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

const updateFlashcard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { deck_id, front, back } = req.body;
    const flashcard = await Flashcard.findByPk(id);
    if (!flashcard) {
      const error = new Error('Flashcard not found');
      error.name = 'NotFoundError';
      throw error;
    }
    const deck = await Deck.findByPk(flashcard.deck_id);
    if (deck.user_id !== req.user.id) {
      const error = new Error('Unauthorized');
      error.name = 'UnauthorizedError';
      throw error;
    }
    if (deck_id) {
      const newDeck = await Deck.findByPk(deck_id);
      if (!newDeck) {
        const error = new Error('New deck not found');
        error.name = 'NotFoundError';
        throw error;
      }
      if (newDeck.user_id !== req.user.id) {
        const error = new Error('Unauthorized');
        error.name = 'UnauthorizedError';
        throw error;
      }
      flashcard.deck_id = deck_id;
    }
    if (front) flashcard.front = front;
    if (back) flashcard.back = back;
    await flashcard.save();
    res.json(flashcard);
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

const deleteFlashcard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findByPk(id);
    if (!flashcard) {
      const error = new Error('Flashcard not found');
      error.name = 'NotFoundError';
      throw error;
    }
    const deck = await Deck.findByPk(flashcard.deck_id);
    if (deck.user_id !== req.user.id) {
      const error = new Error('Unauthorized');
      error.name = 'UnauthorizedError';
      throw error;
    }
    await flashcard.destroy();
    res.json({ message: 'Flashcard deleted' });
  } catch (e) {
    console.error(e);
    next(e); // Propagate the error to the errorHandler middleware
  }
};

module.exports = {
  getFlashcardsByDeck,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
};
