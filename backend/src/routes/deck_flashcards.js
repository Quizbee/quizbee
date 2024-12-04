const express = require('express');

const DeckFlashcard = require('../models/deckFlashcard');
const Flashcard = require('../models/flashcard');
const { deckFlashcardSchema } = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');

const router = express.Router();

// GET /api/deckFlashcards/:deck_id
router.get('/:deck_id', async (req, res) => {
  try {
    const { deck_id } = req.params;
    const flashcards = await DeckFlashcard.findAll({
      where: { deck_id },
      include: [{ model: Flashcard }],
    });
    res.status(200).json(flashcards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/deckFlashcards
router.delete('/', async (req, res) => {
  try {
    const { deck_id, flashcard_id } = req.body;
    const result = await DeckFlashcard.destroy({
      where: { deck_id, flashcard_id },
    });
    res
      .status(200)
      .json({ message: 'Flashcard removed from deck', rowsDeleted: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/deckFlashcards
router.post('/', validateRequest(deckFlashcardSchema), async (req, res) => {
  try {
    const { deck_id, flashcard_id } = req.body;
    const deckFlashcard = await DeckFlashcard.create({ deck_id, flashcard_id });
    res.status(201).json(deckFlashcard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
