// Import express library to create routes
// :Cannot define routes
const express = require("express");
const router = express.Router(); // Create router to define routes

// Import user controller for handling profile logic
// :Routes will have no functionality
const userController = require("../controllers/userController");

// Import auth middleware to protect routes
//:Anyone could update user profiles without login
const authMiddleware = require("../middleware/authMiddleware");

// ======================
// UPDATE user profile
// ======================
// Protected route: user must be logged in
// :Users cannot update their profile
router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);

// Export router to use in main app
// : Routes will not be available in the app
module.exports = router;
