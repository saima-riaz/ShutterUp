const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (fileBuffer, folder = 'shutterup') => {
  return new Promise((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ width: 1200, crop: 'scale', quality: 'auto' }],
        type: 'private'
        
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};


module.exports = uploadToCloudinary;


module.exports = uploadToCloudinary;