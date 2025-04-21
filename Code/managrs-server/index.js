const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
require('dotenv').config();

const app = express();

// Frontend URLs that are allowed to make requests to this backend
const allowedOrigins = [
  'https://red-flower-021f5d510.6.azurestaticapps.net',  // Production URL
  'http://localhost:5173'  // Development URL
];

// CORS options configuration
const options = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow request if origin is in the allowedOrigins list or if no origin is provided (like in the case of Postman or server-to-server requests)
    } else {
      callback(new Error('Not allowed by CORS'));  // Block request if the origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type'],  // Allowed headers
  credentials: true,  // Allow cookies if needed
};

// Enable CORS middleware
app.use(cors(options));  // Apply CORS settings

// Parse incoming JSON data
app.use(express.json());

// Connect to your database
connectToDB();

// Route for checking if the server is live
app.get('/status', (req, res) => {
  res.send('Node server is live!');
});

// Route for creating a new user
app.post('/newUser', async (req, res) => {
  try {
    const user = await User.create(req.body); 
    res.status(201).json(user); 
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
});

// Route for creating a new gig
app.post('/newGig', async (req, res) => {
  try {
    const gig = await Gig.create(req.body); 
    res.status(201).json(gig); 
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
});

// Handle OPTIONS preflight requests
app.options('*', cors(options));  // This will handle OPTIONS requests for all routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
