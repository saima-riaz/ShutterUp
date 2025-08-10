const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendVerificationEmail = async (user, req) => {
  const url = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${user.verificationToken}`;
  await transporter.sendMail({
    from: `"ShutterUp" <${process.env.EMAIL_USERNAME}>`,
    to: user.email,
    subject: 'Verify Your Email',
    html: `<h2>Welcome to ShutterUp!</h2><a href="${url}">Click here to verify</a><p><small>Link expires in 24 hours.</small></p>`
  });
};

const createAccessToken = (userId) => 
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

const createRefreshToken = (userId) => 
  jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) 
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 24*60*60*1000
    });

    await sendVerificationEmail(user, req);
    res.status(201).json({ message: "Verification email sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.isVerified) return res.status(401).json({ message: "Verify email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,          // Set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,          // Set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      user: { _id: user._id, email: user.email, username: user.username }
      // No accessToken in JSON response since it's in cookie
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const accessToken = createAccessToken(user._id);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to refresh token' });
  }
};

// Get current user (optional: depends on frontend usage)
exports.getUser = async (req, res) => {
  try {
    // You can also get token from cookie here, or from Authorization header if used
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'No access token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Logout user
exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};
