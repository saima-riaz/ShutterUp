const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  gallery: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery', default: null },
});

module.exports = mongoose.model("Post", postSchema);