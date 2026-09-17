require('dotenv').config(); // Load environment variables from the .env file
//: environment variables like Cloudinary credentials won't be loaded

// Import the Cloudinary API (v2) SDK
const cloudinary = require('cloudinary').v2;
// Required to use Cloudinary for uploading or managing images
//: Cloudinary functions won't work

// runtime Check to ensure if Cloudinary config is set before continuing execution
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error('Missing Cloudinary config');
}

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

});
// Sets up Cloudinary to be used in other parts of the project
//: Cloudinary instance won't work, image uploads will fail

// Export the configured Cloudinary instance for use in other files
module.exports = cloudinary;
// Makes the configured Cloudinary available in other files
//: other modules can't use Cloudinary
