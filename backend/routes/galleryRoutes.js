const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route (no auth)
router.get("/public/:token", galleryController.getSharedGallery);

// Apply authMiddleware to all routes below
router.use(authMiddleware);

// POST routes
router.post("/create", galleryController.createGallery);
router.post("/:id/share", galleryController.shareGallery);
router.post("/:id/unshare", galleryController.unshareGallery);
router.post("/:url/add-photo", galleryController.addPhotoToGallery);

// GET routes
router.get("/", galleryController.getGalleries);
router.get("/:url", galleryController.getGalleryByUrl);

// DELETE route
router.delete("/:_id", galleryController.deleteGallery);

module.exports = router;