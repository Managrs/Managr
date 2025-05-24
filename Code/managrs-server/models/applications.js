const mongoose = require("mongoose");
const ApplicationSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  jobTitle:{
    type: String,
    required: true
  },
  jobBudget:{
    type: Number,
    required: true
  },
  jobDesc:{
      type: String,
      required: true
  },
  status: {
  type: String,
  required: true,
  enum: ["Submitted", "Approved", "Rejected"],
  default: "Submitted"
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100
  },
  Amountdue: {
    type: Number,
    required: false,
    default: 0
  }
});

module.exports = mongoose.model("Application", ApplicationSchema);
