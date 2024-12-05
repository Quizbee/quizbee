const express = require('express');
const { flashcardSchema } = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');
const authenticateToken = require('../middleware/authenticate_token');
const flashcardController = require('../controllers/flashcardController');

const router = express.Router();

// Get all flashcards for a specific deck
router.get(
  '/deck/:deck_id',
  authenticateToken,
  flashcardController.getFlashcardsByDeck
);

// Get a specific flashcard by ID
router.get('/:id', authenticateToken, flashcardController.getFlashcardById);

// Create a new flashcard
router.post(
  '/',
  authenticateToken,
  validateRequest(flashcardSchema),
  flashcardController.createFlashcard
);

// Update a flashcard
router.put(
  '/:id',
  authenticateToken,
  validateRequest(flashcardSchema),
  flashcardController.updateFlashcard
);

// Delete a flashcard
router.delete('/:id', authenticateToken, flashcardController.deleteFlashcard);

module.exports = router;
