require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const errorHandler = require('./middleware/errorHandler'); // Import the errorHandler

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const deckRoutes = require('./routes/decks');
const flashcardRoutes = require('./routes/flashcards');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_, res) => {
  res.json({
    message: 'Welcome to the Flashcards API!',
    usage:
      'Use the /api/users, /api/decks, and /api/flashcards endpoints to interact with the API.',
  });
});

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/flashcards', flashcardRoutes);

// Use the errorHandler middleware
app.use(errorHandler);

sequelize
  .sync() // Sync models
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = app;
