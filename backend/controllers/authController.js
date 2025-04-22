const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //email service used for verification
  port:465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires
    });

    // Send verification email
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: `"ShutterUp" <${process.env.EMAIL_USERNAME}>`,
      to: user.email,
      subject: 'Verify Your Email',
      text: `Verify your email: ${verificationUrl}`,
      html: `
        <h2>Welcome to ShutterUp!</h2>
        <a href="${verificationUrl}">Click here to verify</a>
        <p><small>Link expires in 24 hours.</small></p>
      </div>
    `,
  
    };

    // Send the verification email notic on terminal 
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");


    // Generate JWT token (optional: you might want to wait until email is verified)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({ 
      message: "Registration successful! Please check your email to verify your account.",
      token,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find the user by verification token and check if the token has expired
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json("Email verified successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// login the user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({ 
        message: "Please verify your email first. Check your inbox for the verification link."
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({ 
      message: "Registration successful! Please check your email to verify your account.",
      token,
      user
    });
  } catch (err) {
    console.error("❌ Email error or user creation issue:", err); // Enhanced logging
    res.status(500).json({ message: "Server Error" });
  }
};


