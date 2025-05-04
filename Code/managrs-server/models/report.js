const mongoose = require('mongoose');

const reportSchema =  new mongoose.Schema({

    clientName:{
        type:String,
        required: true
    },
    reportTitle:{
        type:String,
        required: true
    },
    reportDescription:{
        type:String,
        required: true
    }

});

const Report = mongoose.model('Report',reportSchema);
module.exports = Report;