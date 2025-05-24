// models/Contract.js
import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['draft', 'active', 'completed', 'disputed'], 
    default: 'draft' 
  },
  milestones: [{
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    deadline: { type: Date },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'client-review', 'completed', 'paid'], 
      default: 'pending' 
    },
    feedback: {
      fromClient: { type: String },
      fromFreelancer: { type: String },
      rating: { type: Number, min: 1, max: 5 }
    },
    paymentIntentId: { type: String } // For Stripe
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contract', ContractSchema);