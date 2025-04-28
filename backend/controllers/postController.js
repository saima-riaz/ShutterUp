const Post = require("../models/Post");
const uploadToCloudinary = require("../utils/Upload");
const cloudinary = require('../config/cloudinary');

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

// delete photo

exports.deletePost = async (req, res) => {
  try {
    // Find and delete post from database
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: "Post not found or unauthorized" 
      });
    }

    // Delete from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(post.cloudinaryId, {
      resource_type: 'image'
    });

    if (cloudinaryResult.result === 'not found') {
      console.warn(`Cloudinary image not found: ${post.cloudinaryId}`);
    }

    res.status(200).json({ 
      success: true,
      message: "Photo deleted successfully"
    });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      success: false, 
      message: "Deletion failed"
    });
  }
};