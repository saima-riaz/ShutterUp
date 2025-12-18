const express = require('express');
const router = express.Router();

// Import authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

// Import notification controller
const notifController = require('../controllers/notificationController');

/**
 * ==============================
 * Shared gallery likes (no login required)
 * ==============================
 * This allows a visitor to like a photo in a shared gallery
 * without being authenticated.
 */
router.post('/like', notifController.likePhoto);

router.post('/comment', notifController.commentOnPhoto); // for comments

/**
 * ==============================
 * Authenticated routes
 * ==============================
 * Only logged-in users can create, view, clear, or mark notifications.
 */
router.use(authMiddleware);

// Create a notification (when a logged-in user views a gallery)
router.post('/', notifController.createNotification);

// Get all notifications for logged-in user
router.get('/', notifController.getNotifications);

// Clear all notifications for logged-in user
router.delete('/', notifController.clearNotifications);

// Mark all notifications as read
router.patch('/mark-read', notifController.markAllAsRead);

module.exports = router;
