const Post = require("../models/Post");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const imageUrl = req.file.path; // Local path like "uploads/123-cat.jpg"

    const post = await Post.create({
      user: req.user.id,
      imageUrl,
      caption,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("❌ createPost error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get posts - simplified version
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean(); // Convert to plain JS object

    // Convert to absolute URLs if needed
    const postsWithFullUrls = posts.map(post => ({
      ...post,
      imageUrl: `${req.protocol}://${req.get('host')}/${post.imageUrl}`
    }));

    res.status(200).json(postsWithFullUrls);

  } catch (err) {
    console.error("Failed to fetch posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
