const mongoose = require('mongoose');

const gigSchema =  new mongoose.Schema({

    clientName:{
        type:String,
        required: true
    },

    gigName:{
        type:String,
        required: true
    },

    category: {
        type:String,
        required: true
    },

    gigDescription:{
        type:String,
        required: true
    },

    budget: {
        type:Number,
        required: true
    },

    gigDue: {
        type:Number, //in days
        required: true
    }

});

module.exports = mongoose.model('Gig',gigSchema,'Gigs');