const Notification = require("../models/Notification");

async function createGalleryViewNotification(galleryOwnerId, viewerEmail, galleryId) {
  // Check if notification already exists
  const existing = await Notification.findOne({ 
    user: galleryOwnerId, 
    viewerEmail: viewerEmail, 
    galleryId: galleryId 
  });
  
  if (!existing) {
    await Notification.create({
      user: galleryOwnerId,
      viewerEmail: viewerEmail,
      galleryId: galleryId,
    });
  }
}