const app = require('./app');

const { PORT } = process.env; // Use an environment variable for the port

// Set the default port if not defined in the environment
const port = PORT || 3000;

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
