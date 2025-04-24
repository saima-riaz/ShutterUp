const cloudinary = require('cloudinary').v2;


cloudinary.config({
  secure: true // Force HTTPS
});

module.exports = cloudinary;