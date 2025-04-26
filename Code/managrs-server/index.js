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

/*app.get('/getGig', async (req, res) => {
  try {
    const gigs = await db.collection('Gigs').find().toArray()

    const mapped = gigs.map((gig, index) => ({
      id: index + 1,
      image: "https://static.codia.ai/custom_image/2025-04-10/182941/user-avatar.png",
      name: gig.clientName,
      mail: "gigureout@gmail.com",
      title: gig.gigName,
      description: gig.gigDescription,
      category: gig.category,
      time: gig.gigDue,
      budget: gig.budget,
    }));
    res.json(mapped)
  } catch (err) {
    res.status(500).send('Failed to fetch gigs')
  }
});*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
