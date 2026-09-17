const Post = require("../models/Post"); // Import the Post model (used to interact with posts in the database)
// :You cannot create, find, or delete posts from the database

const uploadToCloudinary = require("../utils/upload"); // Import helper function that uploads images to Cloudinary
// :Images will not be uploaded to Cloudinary

const cloudinary = require('../config/cloudinary');// Import Cloudinary configuration (needed to delete images later)
//:You cannot delete images from Cloudinary


// ---------------- CREATE POST ----------------
exports.createPost = async (req, res) => {
  try {
    // Check if an image was uploaded in the request
    // :The system may crash or create empty posts without images
    if (!req.files?.image) { // means “if there is no image file uploaded.
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Check if the user is authenticated (logged in)
    // :Any unauthenticated person could create posts
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Upload image file to Cloudinary and get its URL + public ID
    // :Image won’t be stored, only text would go in DB
    const result = await uploadToCloudinary(req.files.image.data); //call a helper function "uploadToCloudinary"(in utils/Upload.js)
    
    // Save post details (user id, image URL, and Cloudinary ID) in the database
    // :Post information won’t be stored, nothing to fetch later
    const post = await Post.create({
      user: req.user.id,
      imageUrl: result.secure_url, //Cloudinary returns a secure_url for the uploaded image and a public_id
      cloudinaryId: result.public_id
    });

    // Respond with the created post data
    // :Client won’t know post was successfully created
    res.status(201).json(post);

  } catch (err) {
    // Log error in server console for debugging
    //:You won’t see error details during development
    console.error("createPost error:", err);

    // Send error response to client
    // :Client won’t know something went wrong
    res.status(500).json({ message: "Server Error" });
  }
};


// ---------------- GET POSTS ----------------
exports.getPosts = async (req, res) => {
  try {
    // Find all posts for the current user and sort by creation date (newest first)
    //: All posts (even from other users) could show OR no order applied
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });

    // Send back the list of posts
    //:Client won’t receive any posts to display
    res.status(200).json(posts);

  } catch (err) {
    // Log error if fetching fails
    //:You lose error visibility
    console.error("Failed to fetch posts:", err);

    // Inform client about failure
    //:Client won’t know fetching failed
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


// ---------------- DELETE POST ----------------
exports.deletePost = async (req, res) => {
  try {
    // Find and delete post from database, only if it belongs to the logged-in user
    //:Anyone could delete any post OR posts won’t get deleted
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    // If no matching post found, return error
    // :User may think post was deleted even if it didn’t exist
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: "Post not found or unauthorized" 
      });
    }

    // Delete the corresponding image from Cloudinary using its ID
    //:Database post is deleted but Cloudinary image stays (orphaned file)
    const cloudinaryResult = await cloudinary.uploader.destroy(post.cloudinaryId, {
      resource_type: 'image'
    });

    // Warn if Cloudinary image was not found
    // :You won’t know if the image was already missing
    if (cloudinaryResult.result === 'not found') {
      console.warn(`Cloudinary image not found: ${post.cloudinaryId}`);
    }

    // Respond with success message
    //:Client won’t know deletion was successful
    res.status(200).json({ 
      success: true,
      message: "Photo deleted successfully"
    });

  } catch (err) {
    // Log any errors
    //:You won’t see the reason why deletion failed
    console.error("Delete error:", err);

    // Send error response to client
    // :Client won’t know deletion failed
    res.status(500).json({
      success: false, 
      message: "Deletion failed"
    });
  }
};
