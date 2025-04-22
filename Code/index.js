const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
require('dotenv').config();

const app = express();

// Always run CORS middleware first
const allowedOrigins = [
  'https://red-flower-021f5d510.6.azurestaticapps.net',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

//  Parse incoming JSON requests
app.use(express.json());

//  Connect to MongoDB
connectToDB();

//  Health check
app.get('/status', (req, res) => {
  res.send('Node server is live!');
});

//  POST: Create new user
app.post('/newUser', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST: Create new gig
app.post('/newGig', async (req, res) => {
  try {
    const gig = await Gig.create(req.body);
    res.status(201).json(gig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
