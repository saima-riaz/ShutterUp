const Notification = require('../models/Notification'); // Connects to Notification collection in MongoDB  
// :You cannot save or fetch notifications
const Gallery = require('../models/Gallery');


// =======================
// Create notification when someone views a gallery
// =======================
exports.createNotification = async (req, res) => {
  try {
    const { viewerEmail, galleryId } = req.body;  // get data from request
    const userId = req.user.id; // logged-in user (gallery owner)

    // Check if notification already exists for this viewer and gallery
    const existing = await Notification.findOne({ user: userId, viewerEmail, galleryId });
    if (existing) return res.status(200).json({ message: 'Notification already exists' });
    //: Duplicate notifications would be created every time someone views

    // Create new notification
    const notif = await Notification.create({ user: userId, viewerEmail, galleryId });
    // :Notifications would never be stored in the database

    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// =======================
// Get all notifications for logged-in user
// =======================
exports.getNotifications = async (req, res) => {
  try {
    // Find notifications for this user and sort newest first
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    // :Notifications would not be fetched

    // Add a custom message field for better readability
    res.json(
      notifications.map((n) => ({
        ...n._doc,
        message:
          n.type === "like"
            ? `${n.viewerEmail} liked your Photo`
            : n.type === "comment"
            ? `${n.viewerEmail} commented on your photo: "${n.commentText}"` // ADDED: comment message
            : `${n.viewerEmail} viewed your gallery`,
      }))
    );
    
    //:You would only see raw database fields, no user-friendly message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// =======================
// Clear (delete) all notifications for logged-in user
// =======================
exports.clearNotifications = async (req, res) => {
  try {
    // Delete all notifications linked to this user
    await Notification.deleteMany({ user: req.user.id });
    //:Old notifications would pile up and never be cleared

    res.json({ message: 'All notifications cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//=======================
// Mark ALL AS READ Notification
//==========================
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { $set: { read: true } }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error("Error in markAllAsRead:", err);
    res.status(500).json({ message: err.message });
  }
};

//=======================
// Like photo in shared gallery
//=======================
exports.likePhoto = async (req, res) => {
  try {
    const { viewerEmail, galleryId } = req.body;

    // Find the gallery to get owner
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    
    const userId = gallery.user; // Gallery owner

    // Check if like already exists
    const existing = await Notification.findOne({ 
      user: userId, 
      viewerEmail, 
      galleryId, 
      type: "like" 
    });
    
    if (existing) return res.status(200).json({ message: "Already liked" });

    // Create like notification
    const notif = await Notification.create({
      user: userId,
      viewerEmail,
      galleryId,
      type: "like",
    });

    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// Comment on photo in shared gallery
// =======================
exports.commentOnPhoto = async (req, res) => {
  try {
    const { viewerEmail, galleryId, commentText, photoId } = req.body;

    // Find the gallery to get owner
    const gallery = await Gallery.findById(galleryId);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    
    const userId = gallery.user; // Gallery owner

    // Create comment notification (allow multiple comments)
    const notif = await Notification.create({
      user: userId,
      viewerEmail,
      galleryId,
      photoId, // ADDED: track which photo was commented on
      type: "comment",
      commentText, // store the actual comment
    });

    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};