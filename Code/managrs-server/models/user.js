const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: false
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
    enum: ['freelancer','client', 'ad,min'],
    default: 'FREELANCER'
  },

  status:{
    type: String,
    enum:['active, suspended'],
    default: 'active'

  },
  
  verificationStatus: { 
    type: String, 
    enum: ['verified', 'pending', 'suspended'], 
    default: 'pending' 
  }

},{ timestamps: true });

module.exports = mongoose.model('User', userSchema, 'Users');
