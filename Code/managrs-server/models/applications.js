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
status: {
  type: String,
  required: true,
  enum: ["Submitted", "Approved", "Rejected"],
  default: "Submitted"
}
});

module.exports = mongoose.model("Application", ApplicationSchema);
