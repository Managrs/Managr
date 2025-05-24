const express = require('express');
const cors = require('cors');
const http = require('http');

const { Server } = require('socket.io');

const connectToDB = require('./db/connect');
const User = require('./models/user'); 
const Gig = require('./models/gigs'); 
const Report = require('./models/report'); 
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

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Leave a room
  socket.on('leaveRoom', ({ roomId }) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);
  });

  // Handle sending messages
  socket.on('sendMessage', async ({ roomId, senderId, receiverId, content }) => {
    const message = new Message({ senderId, receiverId, content });
    await message.save();

    io.to(roomId).emit('receiveMessage', {
      senderId,
      receiverId,
      content,
      timestamp: message.timestamp
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
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

/*app.post('/auth/registerOrUpdateUser', async (req, res) => {
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
});*/


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

app.post("/application", async (req, res) => {
  try {
    const message = await Message.create({
      ...req.body,
      isApplication: true,
      status: 'Pending' // Default status
    });
    res.status(201).json(message);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/admin/statuses', async (req, res) => {
  try {
    // Get all application messages (either flagged as applications or with gigId)
    const applications = await Message.find({
      $or: [
        { isApplication: true },
        { gigId: { $exists: true } }
      ]
    })
    .sort({ createdAt: -1 })
    .lean();

    // Get all unique gig IDs from applications
    const gigIds = [...new Set(applications
      .map(app => app.gigId)
      .filter(id => id)
    )];

    // Find all related gigs and users
    const [gigs, users] = await Promise.all([
      Gig.find({ _id: { $in: gigIds } }).lean(),
      User.find().lean()
    ]);

    // Create lookup maps
    const gigMap = {};
    const userMap = {};
    
    gigs.forEach(gig => {
      gigMap[gig._id.toString()] = gig;
    });
    
    users.forEach(user => {
      userMap[user.email] = user;
    });

    // Map applications to statuses with complete data
    const statuses = applications.map(app => {
      const gig = app.gigId ? gigMap[app.gigId.toString()] : null;
      const client = userMap[app.receiverId];
      const freelancer = userMap[app.senderId];

      return {
        _id: app._id,
        freelancerEmail: app.senderId,
        freelancerName: freelancer?.fullName || 'Unknown Freelancer',
        clientEmail: app.receiverId,
        clientName: client?.fullName || gig?.clientName || 'Unknown Client',
        gigId: app.gigId,
        gigName: gig?.gigName || 'Deleted Gig',
        category: gig?.category || 'Unknown',
        budget: gig?.budget || 0,
        content: app.content,
        status: app.status || 'Pending',
        applicationDate: app.createdAt || new Date()
      };
    });

    res.json(statuses);
  } catch (error) {
    console.error('Error in /admin/statuses:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch application statuses',
      error: error.message 
    });
  }
});

app.get("/applications", async (req, res) => {
  try {
    const Messages = await Message.find();
    // In your route handler, add logging:
    const users = await User.find();
    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user;
    });
    const messages = Messages.map((msg, index) => {
      const user = userMap[msg.senderId];
      return {
        id: index + 1,
        sender: msg.senderId,
        receiver: msg.receiverId,
        content: msg.content,
        name: user.fullName,
        avatar: user.avatar,  
      };
    });
    res.json(messages);
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
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  try {
    const userEmail = req.query.userId;

    if (!userEmail) {
      return res.status(400).json({ error: 'Missing userId (email) query parameter' });
    }

    const users = await User.find();
    const currentUser = users.find(u => u.email === userEmail);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const messages = await Message.find({
      $or: [{ senderId: currentUser._id.toString() }, { receiverId: currentUser._id.toString() }]
    });

    const formattedMessages = messages.map((msg, index) => {
      const sender = users.find(u => u._id.toString() === msg.senderId);
      const receiver = users.find(u => u._id.toString() === msg.receiverId);
      return {
        id: index + 1,
        senderId: msg.senderId,
        senderName: sender?.fullName,
        senderAvatar: sender?.avatar,
        receiverId: msg.receiverId,
        receiverName: receiver?.fullName,
        receiverAvatar: receiver?.avatar,
        content: msg.content
      };
    });
    res.json(formattedMessages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/admin/reports', async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;

    const reports = await Report.find(filter)
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/admin/reports/:id', async (req, res) => {
  try {
    const update = {
      status: req.body.status,
      ...(req.body.status === 'resolved' && { resolvedAt: new Date() }),
      ...(req.body.comment && { 
        $push: { 
          adminComments: {
            comment: req.body.comment,
            adminId: req.user._id // From auth middleware
          }
        }
      })
    };

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
