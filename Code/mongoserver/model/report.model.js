const mongoose =  require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);


const reportSchema = new mongoose.Schema({
    reportId:{
        type:Number,
        /*auto increment*/
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    attended: {
      type: Boolean,
      default: false
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client' // Make sure you have a Client model defined
    }
  },{timestamps:true});

  reportSchema.plugin(autoIncrement, { inc_field: 'reportId' });

  const Report = mongoose.model('Report', reportSchema);

  module.exports = Report;