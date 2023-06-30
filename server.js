const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());


// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'njokoth',
  host: 'localhost',
  database: 'mangomdb',
  password: 'thisisforresearch',
  port: 5432,
});

// Define a POST route for creating an account
app.post('/create-account', async (req, res) => {
  const { fullName, username, password } = req.body;

  try {
    // Insert the user data into the database
    await pool.query('INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3)', [fullName, username, password]);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error creating account:', error);
    res.sendStatus(500);
  }
});

// Define a POST route for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database to check if the credentials match
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    const user = result.rows[0];

    if (user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.sendStatus(500);
  }
});

// Define a POST route for sending a message
app.post('/send-message', async (req, res) => {
  const { senderUsername, recipientUsername, messageText } = req.body;

  try {
    // Check if the recipient's username exists in the users table
    const recipientExists = await pool.query('SELECT * FROM users WHERE username = $1', [recipientUsername]);

    if (recipientExists.rows.length === 0) {
      res.status(400).json({ error: 'Recipient username not found' });
      return;
    }

    // Insert the message data into the messages table, including the timestamp
    const timestamp = new Date().toISOString(); // Use ISO 8601 format for the timestamp
    await pool.query('INSERT INTO messages (sender_username, recipient_username, message_text, timestamp) VALUES ($1, $2, $3, $4)', [senderUsername, recipientUsername, messageText, timestamp]);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending message:', error);
    res.sendStatus(500);
  }
});



// Define a GET route for fetching user messages
app.get('/get-messages', async (req, res) => {
  const recipientUsername = req.query.recipientUsername;

  try {
    // Fetch messages for the recipient username from the messages table
    const result = await pool.query('SELECT * FROM messages WHERE recipient_username = $1', [recipientUsername]);
    const messages = result.rows;

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.sendStatus(500);
  }
});




// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
