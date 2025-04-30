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

app.get('/getGig', async (req, res) => {
  try {
    const gigs = await Gig.find(); 

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
    res.json(mapped);
  } catch (err) {
    res.status(500).send('Failed to fetch gigs');
  }
});

app.get('/users', async(req,res) =>{
  try{
    const {role, status, search} = req.query;
    const filter = {};
    if (role){
      filter.role = role;
    }

    if(status){
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter);
    res.json(users);
  } catch(error){
    res.status(500).json({error: error.message});
  }

});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
