const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");
const upload = require("../utils/upload");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST route for creating posts
router.post("/", authMiddleware, upload.single("image"), createPost);
// GET route for fetching posts
router.get("/", authMiddleware, getPosts);


module.exports = router;