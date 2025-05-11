const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const authMiddleware = require("../middleware/authMiddleware");


// POST route for creating galleries
router.post("/create", authMiddleware, galleryController.createGallery);

// GET route for fetching all galleries
router.get("/", authMiddleware, galleryController.getGalleries);

// GET route send image fav gallery
router.get("/:url", authMiddleware, galleryController.getGalleryByUrl);

// DELETE route for galleries (using _id MongoDB)
router.delete('/:_id', authMiddleware, galleryController.deleteGallery);

// POST route for adding photos to galleries by using gallery's URL 
router.post('/:url/add-photo', authMiddleware, galleryController.addPhotoToGallery);

// Export the router to be used in main app
module.exports = router;