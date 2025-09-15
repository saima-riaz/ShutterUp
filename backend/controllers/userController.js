const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;

    // Handle profile picture upload
    if (req.files && req.files.profilePic) {
      const file = req.files.profilePic;
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.data.toString('base64')}`,
        { folder: 'avatars' }
      );
      user.profilePic = result.secure_url;
    }

    await user.save();
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
