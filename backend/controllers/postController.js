const Post = require("../models/Post");

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
