const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  receiverId: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  isApplication: { type: Boolean, default: false },
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'},
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
