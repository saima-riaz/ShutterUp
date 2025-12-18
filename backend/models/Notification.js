// Import mongoose to define schema and models
// :You cannot create a schema or model
const mongoose = require('mongoose');

// Define the schema (structure) for notifications
const notificationSchema = new mongoose.Schema({
  // The owner of the gallery who will receive the notification
  // :You won’t know which user the notification belongs to
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Email of the person who viewed the gallery
  //:You cannot identify who triggered the notification
  viewerEmail: { type: String, required: true },

  // ID of the gallery that was viewed
  //:You won’t know which gallery was viewed
  galleryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery', required: true },

  photoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

  type: { type: String, enum: ['view', 'like', 'comment'], default: 'view' }, // for view, like, comments *

  //store comments text
  commentText: { type: String},

  // When the notification was created
  //:You cannot track when the event happened
  createdAt: { type: Date, default: Date.now },

  // Has the notification been read by the user
  //:You cannot track read/unread status
  read: { type: Boolean, default: false },
});

// Create and export the Notification model from the schema
//:You cannot use notifications in the app
module.exports = mongoose.model('Notification', notificationSchema);
