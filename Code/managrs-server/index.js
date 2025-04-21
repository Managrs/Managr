const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
require('dotenv').config();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  'https://red-flower-021f5d510.6.azurestaticapps.net', // Production
  'http://localhost:5173' // Development
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    console.log('Origin trying to access:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Connect to the database
connectToDB();

// Health check route
app.get('/status', (req, res) => {
  res.send('Node server is live!');
});

// Route to create a new user
app.post('/newUser', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to create a new gig
app.post('/newGig', async (req, res) => {
  try {
    const gig = await Gig.create(req.body);
    res.status(201).json(gig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
