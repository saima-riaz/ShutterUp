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

    const gallery = await Gallery.create({ 
      title, 
      description, 
      url, 
      user: req.user.id 
    });
    
    res.status(201).json(gallery);
  } catch (error) {
    console.error("Create gallery error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all galleries (GET / for user)
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({ user: req.user.id })
      .populate('user', 'username email profilePic')
      .populate('photos');
    
    res.status(200).json(galleries);
  } catch (error) {
    console.error("Failed to fetch galleries:", error.message);
    res.status(500).json({ message: "Failed to fetch galleries" });
  }
};

// Get single gallery by URL (GET /:url)
exports.getGalleryByUrl = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({ 
      url: req.params.url,
      user: req.user.id // Added user filter for security
    }).populate('photos');
    
    if (!gallery) {
      console.log(`Gallery not found: ${req.params.url}`);
      return res.status(404).json({ message: "Gallery not found" });
    }
    
    res.status(200).json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete gallery (DELETE /:_id)
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOneAndDelete({ 
      _id: req.params._id, 
      user: req.user.id 
    });
   
    if (!gallery) {
      console.log(`Delete failed - Gallery not found: ${req.params._id}`);
      return res.status(404).json({ 
        success: false, 
        message: "Gallery not found or unauthorized" 
      });
    }
    
    console.log(`Gallery deleted: ${gallery._id}`);
    res.status(200).json({ 
      success: true, 
      message: "Gallery deleted successfully" 
    });
  } catch (error) {
    console.error("Delete gallery error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Deletion failed" 
    });
  }
};

// Add photo to gallery
exports.addPhotoToGallery = async (req, res) => {
  try {
    const { photoId } = req.body;
    const gallery = await Gallery.findOne({ 
      url: req.params.url, 
      user: req.user.id 
    });

    if (!gallery) {
      console.log(`Gallery not found: ${req.params.url}`);
      return res.status(404).json({ message: "Gallery not found" });
    }

    if (!gallery.photos.includes(photoId)) {
      gallery.photos.push(photoId);
      await gallery.save();
      console.log(`Photo ${photoId} added to gallery ${gallery._id}`);
    }

    res.status(200).json({ success: true, gallery });
  } catch (error) {
    console.error('Add photo error:', error.message);
    res.status(500).json({ message: "Server error" });
  }
};