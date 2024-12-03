const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/user');
const Deck = require('./models/deck');
const Flashcard = require('./models/flashcard');
const DeckFlashcard = require('./models/deckFlashcard');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.get('/api', (_, res) => {
  res.json({ message: 'Welcome to the Flashcards API' });
});

app.get('/api/users', async (_, res) => {
  try {
    const users = await User.findAll(); // Await the result of the query
    res.json({ users }); // Send the array of users as a JSON response
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

app.get('/api/decks', async (_, res) => {
  try {
    const decks = await Deck.findAll(); // Await the result of the query
    res.json({ decks }); // Send the array of decks as a JSON response
  } catch (err) {
    console.error('Error fetching decks:', err);
    res.status(500).json({ error: 'Unable to fetch decks' });
  }
});

app.get('/api/flashcards', async (_, res) => {
  try {
    const flashcards = await Flashcard.findAll(); // Await the result of the query
    res.json({ flashcards }); // Send the array of flashcards as a JSON response
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    res.status(500).json({ error: 'Unable to fetch flashcards' });
  }
});

app.get('/api/deck_flashcards', async (_, res) => {
  try {
    const deck_flashcards = await DeckFlashcard.findAll(); // Await the result of the query
    res.json({ deck_flashcards }); // Send the array of deck_flashcards as a JSON response
  } catch (err) {
    console.error('Error fetching deck_flashcards:', err);
    res.status(500).json({ error: 'Unable to fetch deck_flashcards' });
  }
});

sequelize
  .sync() // Sync models
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = app;
