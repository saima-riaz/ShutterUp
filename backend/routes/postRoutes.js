const express = require("express");
const { createPost } = require("../controllers/postController");
const upload = require("../utils/upload");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);

module.exports = router;
