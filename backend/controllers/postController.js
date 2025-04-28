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
    console.log('Cloudinary upload result:', result);
    
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
    // Verify the post belongs to the requesting user
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id // Ensures users can only delete their own posts
    });
 
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: "Post not found or you don't have permission" 
      });
    }

     // Delete photo on Cloudinary automatically when delete from dashboard
     const cloudinaryResult = await cloudinary.uploader.destroy(post.cloudinaryId, {
      resource_type: 'image'
    });
     console.log('Cloudinary deletion result:', cloudinaryResult);

    res.status(200).json({ 
      success: true,
      message: "Photo deleted successfully", 
      deletedId: post._id
    });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      success: false, 
      message: "Server error during deletion"
     });
  }
};