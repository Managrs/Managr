const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientId: { 
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
  

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
