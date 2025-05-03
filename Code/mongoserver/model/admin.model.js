const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    AdminId: { 
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
  

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
