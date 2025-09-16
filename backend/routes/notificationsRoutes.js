const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const notifController = require('../controllers/notificationController');

router.use(authMiddleware);

router.post('/', notifController.createNotification); // optional: triggered when gallery viewed
router.get('/', notifController.getNotifications);
router.delete('/', notifController.clearNotifications);

module.exports = router;
