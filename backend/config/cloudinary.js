require('dotenv').config(); // Add this at the very top

console.log('Checking env vars:', {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? '***' : 'MISSING',
  secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'MISSING'
});

const cloudinary = require('cloudinary').v2;

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error('❌ Current environment variables:', process.env); // Debug all vars
  throw new Error('Missing Cloudinary config');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports = cloudinary;