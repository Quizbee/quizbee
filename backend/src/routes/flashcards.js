const express = require('express');

const Flashcard = require('../models/flashcard');
const { flashcardSchema } = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');

const router = express.Router();

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
    res.json(flashcards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// Get a specific flashcard by ID
router.get('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.json(flashcard);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch flashcard' });
  }
});

// Create a new flashcard
router.post('/', validateRequest(flashcardSchema), async (req, res) => {
  try {
    const { user_id, front, back } = req.body;
    const newFlashcard = await Flashcard.create({ user_id, front, back });
    res.status(201).json(newFlashcard);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create flashcard' });
  }
});

module.exports = router;
