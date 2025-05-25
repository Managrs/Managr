const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  reportTitle: { type: String, required: true },
  reportDescription: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'reviewing', 'resolved', 'rejected'],
    default: 'pending' 
  },
  category: {
    type: String,
    enum: ['payment', 'behavior', 'technical', 'other'],
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date,
  adminComments: [{
    comment: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }]
});

const Report = mongoose.model('Report',reportSchema);
module.exports = Report;