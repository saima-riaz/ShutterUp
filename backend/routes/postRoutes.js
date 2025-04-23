const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST route for creating posts (now handles Cloudinary upload)
router.post("/", authMiddleware, (req, res, next) => {
    // Handle file upload middleware
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    next();
  }, createPost);
// GET route for fetching posts
router.get("/", authMiddleware, getPosts);


module.exports = router;