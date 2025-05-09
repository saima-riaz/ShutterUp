const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
  type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
