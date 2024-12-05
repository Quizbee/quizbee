const express = require('express');
const { deckSchema } = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');
const authenticateToken = require('../middleware/authenticate_token');
const deckController = require('../controllers/deckController');

const router = express.Router();

// Get all decks
router.get('/', authenticateToken, deckController.getAllDecks);

// Get a specific deck by ID
router.get('/:id', authenticateToken, deckController.getDeckById);

// Create a new deck
router.post(
  '/',
  authenticateToken,
  validateRequest(deckSchema),
  deckController.createDeck
);

// Update a deck
router.put(
  '/:id',
  authenticateToken,
  validateRequest(deckSchema),
  deckController.updateDeck
);

// Delete a deck
router.delete('/:id', authenticateToken, deckController.deleteDeck);

module.exports = router;
