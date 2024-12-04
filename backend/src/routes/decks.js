const express = require('express');

const Deck = require('../models/deck');
const { deckSchema } = require('../validation/schemas');
const validateRequest = require('../utils/validateRequest');

const router = express.Router();

// Get all decks
router.get('/', async (req, res) => {
  try {
    const decks = await Deck.findAll();
    res.json(decks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});

// Get a specific deck by ID
router.get('/:id', async (req, res) => {
  try {
    const deck = await Deck.findByPk(req.params.id);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.json(deck);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch deck' });
  }
});

// Create a new deck
router.post('/', validateRequest(deckSchema), async (req, res) => {
  try {
    const { user_id, name, description } = req.body;
    const newDeck = await Deck.create({ user_id, name, description });
    res.status(201).json(newDeck);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create deck' });
  }
});

module.exports = router;
