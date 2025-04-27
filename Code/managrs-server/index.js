const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://jolly-bush-0f6975910.6.azurestaticapps.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());


connectToDB();


app.get('/', (req, res) => {
  res.send('Node server is live!');
});


app.post('/newUser', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post('/newGig', async (req, res) => {
  try {
    const gig = await Gig.create(req.body);
    res.status(201).json(gig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/allgigs', async (req, res) => {
  try {
    const gigs = await Gig.find();
    const users = await User.find();
    const userMap = {};
    users.forEach(user => {
      userMap[user.fullName] = user;
    });
    const mapped = gigs.map((gig, index) => {
      const user = userMap[gig.clientName];
      return {
        id: index + 1,
        image: user.avatar,
        name: gig.clientName,
        mail: user.email,
        title: gig.gigName,
        description: gig.gigDescription,
        category: gig.category,
        time: gig.gigDue,
        budget: gig.budget,
      };
    });
    res.json(mapped);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/allusers', async (req, res) => {
  try {
    const users = await User.find();
    const freelancers = users.map((user, index) => {
      return {
        id: index + 1,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
      };
    });
    res.json(freelancers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
