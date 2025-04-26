const Post = require("../models/Post");
const uploadToCloudinary = require("../utils/Upload");

exports.createPost = async (req, res) => {
  try {

    if (!req.files?.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.files.image.data);
    
    const post = await Post.create({
      user: req.user.id,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("❌ createPost error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};