const Gallery = require('../models/Gallery');

// Create gallery (POST /create)
exports.createGallery = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    if (!title || !description || !url) {
      return res.status(400).json({ message: "Title, description, and URL are required" });
    }

    const existingGallery = await Gallery.findOne({ url });
    if (existingGallery) {
      return res.status(400).json({ message: "Gallery URL already exists" });
    }

    const gallery = await Gallery.create({ title, description, url, user: req.user.id });
    res.status(201).json(gallery);
  } catch (error) {
    console.error("Create gallery error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all galleries (GET /)
exports.getGalleries = async (req, res) => {
  try {
    // Debugging log to check the user id passed in the request
   // console.log("User ID (Fetching galleries):", req.user.id);

    // Fetch galleries based on the user id and populate user details
    const galleries = await Gallery.find({ user: req.user.id })
      .populate('user', 'username email profilePic'); // Populate the user field with specific fields

    // Log the result for debugging
    //console.log("Fetched Galleries:", galleries);

    res.status(200).json(galleries);
  } catch (error) {
    console.error("Failed to fetch galleries:", error);
    res.status(500).json({ message: "Failed to fetch galleries" });
  }
};

// Get gallery by URL (GET /:url)
exports.getGalleryByUrl = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({ url: req.params.url, user: req.user.id });
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.status(200).json(gallery);
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
};

// Delete gallery (DELETE /:_id)
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOneAndDelete({ _id: req.params._id, user: req.user.id });
    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery not found or unauthorized" });
    }
    res.status(200).json({ success: true, message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Delete gallery error:", error);
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
};