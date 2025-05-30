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
    required: false 
  },

  role: {
    type: String,
    enum: ['CLIENT','FREELANCER', 'ADMIN'],
    default: 'FREELANCER'
  }
});

module.exports = mongoose.model('User', userSchema, 'Users');
