const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require("mongoose");

const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
const Report = require('./models/report'); 
const Application = require('./models/applications');
const Message = require('./models/messages');

require('dotenv').config();

const app = express();
connectToDB();

const server = http.createServer(app);
const io = new Server (server,  {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json( {limit: '10mb'} ));

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


app.post('/newUser', async (req, res) => {
  try {
    const { email, fullName, avatar, role } = req.body;

    if (!email || !fullName || !role) {
      return res.status(400).json({ error: 'Missing required fields: email, fullName, or role' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
            return res.status(200).json({ message: 'User already exists', existing});
    }

    const user = await User.create({
      fullName,
      email,
      avatar: avatar || '/profile.jpg',
      role,
    });

    res.status(201).json( {message: 'User created', user});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/editprofile/:email', async (req, res) => {
  const Email = req.params.email;
  const newAvatar = req.body.avatar;

  try {
    const updatedUser = await User.findOneAndUpdate({ email: Email }, { avatar: newAvatar }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/user/:email', async (req, res) => {
  const Email = req.params.email;

  try {
    const user = await User.findOne({ email: Email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const thisUser = {
      fullName: user.fullName,
      avatar: user.avatar,
      role: user.role,
      email: user.email
    };

    res.status(200).json({ user: thisUser });
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

app.post('/newReport', async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
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
      userMap[user.email] = user;
    });
    const mapped = gigs.map((gig, index) => {
      const user = userMap[gig.clientEmail];
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

app.post("/application", async (req, res) => {
  try{
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch(err){
    res.status(400).json({ error: err.message });
  }
});

app.get("/jobRequests/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const applicationsRaw = await Application.find({ receiverId: email });
    const senderIds = [...new Set(applicationsRaw.map(msg => msg.senderId))];
    const users = await User.find({ email: { $in: senderIds } });
    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user;
    });

    const applications = applicationsRaw.map(msg => {
      const user = userMap[msg.senderId];
      return {
        id: msg._id.toString(),
        sender: msg.senderId,
        receiver: msg.receiverId,
        content: msg.content,
        name: user?.fullName || "Unknown",
        avatar: user?.avatar || null,
        status: msg.status || "Submitted",
        jobTitle:msg.jobTitle,
        jobDesc: msg.jobDesc,
        jobBudget: msg.jobBudget,
      };
    });

    res.json(applications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/myApplications/:email", async (req, res) => {
  const email = req.params.email;
  console.log("Fetching applications for:", email);

  try {
    const applicationsRaw = await Application.find({ senderId: email });

    const receiverIds = [...new Set(applicationsRaw.map(msg => msg.receiverId))];

    const users = await User.find({ email: { $in: receiverIds } });

    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user;
    });

    const applications = applicationsRaw.map(msg => {
      const user = userMap[msg.receiverId];
      return {
        id: msg._id.toString(),
        sender: msg.senderId,
        receiver: msg.receiverId,
        content: msg.content,
        name: user?.fullName || "Unknown",
        avatar: user?.avatar,
        status: msg.status || "Submitted",
        jobTitle:msg.jobTitle,
        jobDesc: msg.jobDesc,
        jobBudget: msg.jobBudget,
      };
    });

    res.json(applications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/approve/:applicationId", async (req, res) => {
  try {
    const  messageId = req.params.applicationId;
    const objectId = new mongoose.Types.ObjectId(messageId);
    const updatedMessage = await Application.findByIdAndUpdate(
      objectId,
      { status: "Approved" },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ message: "Status updated to Approved", data: updatedMessage });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/reject/:applicationId", async (req, res) => {

  try {
    const  messageId = req.params.applicationId;
    const objectId = new mongoose.Types.ObjectId(messageId);
    const updatedMessage = await Application.findByIdAndUpdate(
      objectId,
      { status: "Rejected" },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ message: "Status updated to Rejected", data: updatedMessage });
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
        email: user.email
      };
    });
    res.json(freelancers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post('/newMessage', async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = new Message({ senderId, receiverId, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/deleteUser', async (req, res) => {
  const { email } = req.body;
  if (!email){
     return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const deletedUser = await User.findOneAndDelete({email: email});
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/messages', async (req, res) => {
  const { user1, user2 } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }); /*.sort({ createdAt: 1 });*/
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/contacts', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const messages = await Message.find({
      $or: [{ senderId: email }, { receiverId: email }]
    });
    const contactEmails = new Set();

    messages.forEach(msg => {
      if (msg.senderId !== email) contactEmails.add(msg.senderId);
      if (msg.receiverId !== email) contactEmails.add(msg.receiverId);
    });

    const contacts = await User.find({ email: { $in: Array.from(contactEmails) } });

    const response = contacts.map((user, index) => ({
      id: index + 1,
      fullName: user.fullName,
      avatar: user.avatar,
      email: user.email
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getprogress', async (req, res) => {
  const  { email, Title, Description } = req.query;

  try {
    const trackings = await Application.find({
      $and: [
        { senderId: email},
        { jobTitle: Title},
        { jobDesc: Description}
      ]
    });
    res.json(trackings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

app.put('/setprogress', async (req, res) => {

  try {
    const  { progressid,progress} = req.body;

    const updatedApp = await Application.findByIdAndUpdate(
      progressid,
      { progress: progress },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Progress updated', application: updatedApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/setmilestone', async (req, res) => {

  try {
    const  { progressid, Amountdue} = req.body;

    const updatedApp = await Application.findByIdAndUpdate(
      progressid,
      { Amountdue: Amountdue },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Amount updated', application: updatedApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/allreports', async (req, res) => {
  try {
    const reports = await Report.find();
    const users = await User.find();
    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user;
    });
    const mapped = reports.map((report, index) => {
      const user = userMap[report.clientEmail];
      return {
        id: index + 1,
        image: user?.avatar || '',
        name: report.clientName,
        mail: report.clientEmail,
        title: report.reportTitle,
        description: report.reportDescription,
      };
    });
    res.json(mapped);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/approvedApplications", async (req, res) => {
  try {
    const applicationsRaw = await Application.find({ status: "Approved" });

    const receiverIds = [...new Set(applicationsRaw.map(app => app.receiverId))];

    const users = await User.find({ email: { $in: receiverIds } });

    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user;
    });

    const applications = applicationsRaw.map(app => {
      const user = userMap[app.receiverId];
      return {
        id: app._id.toString(),
        sender: app.senderId,
        receiver: app.receiverId,
        avatar: user?.avatar,
        jobTitle: app.jobTitle,
        jobBudget: app.jobBudget,
      };
    });

    res.json(applications);
  } catch (err) {
    console.error("Error fetching approved applications:", err);
    res.status(400).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
