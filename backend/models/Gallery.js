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
    ref: 'User', // This links to the 'User' model, assuming you have a 'User' model
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
