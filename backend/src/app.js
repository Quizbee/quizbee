const express = require('express');
const cors = require('cors');
const sequelize = require('./db/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Hello World
app.get('/', (_, res) => {
  res.send('Hello World');
});

// Sequelize database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
