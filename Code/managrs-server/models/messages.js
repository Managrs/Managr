const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model("Message", MessageSchema);
