const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery'); // Mongoose model


// =============================================
//  GALLERY CRUD OPERATIONS
// =============================================

/**
 * @route   POST /api/gallery/create
 * @desc    Create a new gallery
 * @access  Private
 */

// Create a new gallery
router.post('/create', async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const newGallery = new Gallery({ title, description, url });
    await newGallery.save();

    res.status(201).json({ message: "Gallery created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// Get all galleries
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch galleries." });
  }
});


router.get('/:url', async (req, res) => {
  try {
    const gallery = await Gallery.findOne({ url: req.params.url });
    
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.json(gallery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
});

module.exports = router;

