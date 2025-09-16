const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // owner of gallery
  viewerEmail: { type: String, required: true },
  galleryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery', required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', notificationSchema);
