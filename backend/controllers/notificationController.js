const Notification = require('../models/Notification');

// Create notification when someone first views a gallery
exports.createNotification = async (req, res) => {
  try {
    const { viewerEmail, galleryId } = req.body;
    const userId = req.user.id;

    // Only notify once per viewer per gallery
    const existing = await Notification.findOne({ user: userId, viewerEmail, galleryId });
    if (existing) return res.status(200).json({ message: 'Notification already exists' });

    const notif = await Notification.create({ user: userId, viewerEmail, galleryId });
    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get notifications for logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json(
      notifications.map(n => ({
        ...n._doc,
        message: `${n.viewerEmail} viewed your gallery`,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear all notifications for logged-in user
exports.clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user.id });
    res.json({ message: 'All notifications cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
