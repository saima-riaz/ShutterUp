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

// DELETE route for galleries (using _id for MongoDB)
router.delete('/:_id', authMiddleware, galleryController.deleteGallery);


module.exports = router;