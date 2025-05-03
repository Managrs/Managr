const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    FreelancerId: { 
        type: String,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    pic: {
      type: String, // typically a URL or base64 string
      default: ''
    },
    role: {  // new field
      type: String,
      enum: ['client', 'admin', 'freelancer'], 
      default: 'user'
    }
  });
  

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
