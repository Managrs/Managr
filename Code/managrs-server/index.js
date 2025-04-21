const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://red-flower-021f5d510.6.azurestaticapps.net',  // Frontend URL
  'http://localhost:5173'  // Local development (if needed)
];

const options = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // If you want to allow cookies
};

app.use(cors(options)); //I will change this so that my server only responds to my app
app.use(express.json());

connectToDB();


app.get('/status', (req, res) => {
  res.send('Node server is live!');
});

app.post('/newUser', async (req, res) =>{
    try {
        const user = await User.create(req.body); 
        res.status(201).json(user); 
      } catch (err) {
        res.status(400).json({ error: err.message }); 
      }
});

app.post('/newGig', async (req, res) =>{
    try {
        const gig = await Gig.create(req.body); 
        res.status(201).json(gig); 
      } catch (err) {
        res.status(400).json({ error: err.message }); 
      }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
