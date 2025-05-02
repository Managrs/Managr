const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },

  avatar : {
    type: String,
    required: true 
  },

  role: {
    type: String,
    enum: ['freelancer','client', 'admin'],
    default: 'freelancer'
  },

  status:{
    type: String,
    enum:['active', 'suspended'],
    default: 'active'

  },
  
  verificationStatus: { 
    type: String, 
    enum: ['verified', 'pending', 'suspended'], 
    default: 'pending' 
  }
});

module.exports = mongoose.model('User', userSchema, 'Users');
