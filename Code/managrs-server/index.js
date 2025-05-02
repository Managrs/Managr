const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
const Message = require('./models/messages');

require('dotenv').config();

const app = express();
connectToDB();

app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('Node server is live!');
});

app.post('/newUser', async(req, res) => {
  try{
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/auth/registerOrUpdateUser', async (req, res) => {
  try {
    const { fullName, email, avatar, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ fullName, email, avatar, role });
      await user.save();
    } else {
      user.fullName = fullName;
      user.avatar = avatar;
      await user.save();
    }

    res.status(200).json({ message: 'User synced' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to sync user' });
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

app.post("/newApplication", async (req, res) => {
  const { clientEmail, freelancerEmail, gigName, gigDescription } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreply.managrs@gmail.com",
      pass: "your-app-password" 
    }
  });

  const mailOptions = {
    from: freelancerEmail,
    to: clientEmail,
    subject: `Application for ${gigName}`,
    text: gigDescription
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent!" });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.post("/messages", async (req, res) => {
  try{
    const message = await Message.create(req.body);
   /* const { senderId, receiverId, content } = req.body;
    const message = new Message({ senderId, receiverId, content });
    await message.save();*/
    res.status(201).json(message);
  } catch(err){
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
        email: user.email
      };
    });
    res.json(freelancers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
