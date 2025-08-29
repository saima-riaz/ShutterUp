const Gallery = require("../models/Gallery");
const Notification = require("../models/Notification");
const { v4: uuidv4 } = require("uuid");

// helper: slugify title → url-friendly string
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// =======================
// Create new gallery
// =======================
exports.createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ message: "Title and description are required" });

    const existing = await Gallery.findOne({ title, user: req.user.id });
    if (existing)
      return res.status(400).json({ message: "You already have a gallery with this title." });

    const gallery = await Gallery.create({
      title,
      description,
      url: `${slugify(title)}-${uuidv4().slice(0, 6)}`,
      user: req.user.id,
    });

    res.status(201).json(gallery);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Fetch all galleries
// =======================
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({ user: req.user.id })
      .populate("user", "username email profilePic")
      .populate("photos");
    res.status(200).json(galleries);
  } catch {
    res.status(500).json({ message: "Failed to fetch galleries" });
  }
};

// =======================
// Fetch single gallery by URL
// =======================
exports.getGalleryByUrl = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({ url: req.params.url, user: req.user.id }).populate("photos");
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.status(200).json(gallery);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Delete gallery by ID
// =======================
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOneAndDelete({ _id: req.params._id, user: req.user.id });
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery not found or unauthorized" });
    res.status(200).json({ success: true, message: "Gallery deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
};

// =======================
// Add photo to gallery by URL
// =======================
exports.addPhotoToGallery = async (req, res) => {
  try {
    const { photoId } = req.body;
    const gallery = await Gallery.findOne({ url: req.params.url, user: req.user.id });
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    if (!gallery.photos.includes(photoId)) {
      gallery.photos.push(photoId);
      await gallery.save();
    }

    res.status(200).json({ success: true, gallery });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Share Gallery → generate a share link
// =======================
exports.shareGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({ _id: req.params.id, user: req.user.id });
    if (!gallery) return res.status(404).json({ message: "Gallery not found or unauthorized" });

    if (!gallery.shareToken) gallery.shareToken = uuidv4();
    gallery.isShared = true;
    await gallery.save();

    const shareUrl = `${process.env.FRONTEND_URL}/shared/${gallery.shareToken}`;
    res.json({ shareUrl });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Unshare Gallery → disable sharing
// =======================
exports.unshareGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({ _id: req.params.id, user: req.user.id });
    if (!gallery) return res.status(404).json({ message: "Gallery not found or unauthorized" });

    gallery.isShared = false;
    gallery.shareToken = null;
    await gallery.save();

    res.json({ message: "Gallery unshared successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Access Shared Gallery (public) + Notification
// =======================
exports.getSharedGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      shareToken: req.params.token,
      isShared: true
    }).populate("photos");

    if (!gallery) {
      return res.status(404).json({ message: "Shared gallery not found" });
    }

    // Create a notification every time the shared gallery is accessed
    await Notification.create({
      user: gallery.user,          // gallery owner
      message: `Your gallery "${gallery.title}" was viewed.`,
      viewerEmail: req.query.email || null // optional
    });

    res.status(200).json(gallery);
  } catch (error) {
    console.error("Get shared gallery error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Get notifications for logged-in user
// =======================
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
