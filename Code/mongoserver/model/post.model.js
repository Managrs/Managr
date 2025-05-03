const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    postId: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client' // Make sure you have a Client model defined
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Freelancer' // Make sure you have a Client model defined
    },
    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    postDescription: {
        type: String,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    dueDate: {
        type: Number, //in days
        required: true
    },
    taken: {
        type: Boolean,
        default: false
    }

},{timestamps:true});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;