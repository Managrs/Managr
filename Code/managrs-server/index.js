const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
require('dotenv').config();

const app = express();

//  Parse incoming JSON requests
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());

//  Connect to MongoDB
connectToDB();

//  Health check
app.get('/', (req, res) => {
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
