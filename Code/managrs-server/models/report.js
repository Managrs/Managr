const reportSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  reportTitle: {
    type: String,
    required: true
  },
  reportDescription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'resolved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date,
  adminComments: [{
    comment: String,
    adminId: mongoose.Schema.Types.ObjectId,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  category: {
    type: String,
    enum: ['payment', 'behavior', 'technical', 'other'],
    required: true
  }
});