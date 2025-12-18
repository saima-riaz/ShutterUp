const express = require("express"); // Import Express framework // Cannot create Express app or routes
const mongoose = require("mongoose"); // Import Mongoose for MongoDB // Cannot connect to MongoDB
const dotenv = require("dotenv"); // Load environment variables from .env // Cannot access process.env variables
const cors = require("cors"); // Enable cross-origin requests // Frontend may not communicate with backend due to CORS
const cookieParser = require("cookie-parser"); // Parse cookies from requests // Cannot read cookies like JWT tokens
const fileUpload = require("express-fileupload"); // Handle file upload (Cannot upload images/files)
dotenv.config(); // Load .env variables // (process.env variables like DB URI or secrets won't work)
const app = express(); // Create Express app // (Cannot define routes or middleware)


// =======================
// Middleware
// =======================
app.use(cookieParser()); // Parse cookies // Cannot access req.body for JSON requests
app.use(express.json()); // Parse JSON bodies //Cannot access req.body for JSON requests

app.use(cors({
  origin: "http://localhost:5173", // Allow frontend origin
  credentials: true,               // Allow cookies in requests
  //exposedHeaders: ['set-cookie']   // Expose set-cookie headers
}));
// :Frontend may fail to make authenticated requests

app.use(fileUpload({
  useTempFiles: false,               // Keep files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
  parseNested: true                  // Parse nested objects in uploads
}));
//: Cannot handle file uploads

// =======================
// MongoDB Connection
// =======================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);
// :App cannot store or retrieve data from MongoDB

// =======================
// Routes
// =======================
app.use("/api/auth", require("./routes/authRoutes")); // Auth routes // Cannot register, login, or verify email
app.use("/api/gallery", require("./routes/galleryRoutes")); // Gallery routes // Cannot create, share, or manage galleries
app.use("/api/user", require("./routes/userRoutes")); // User profile routes // Cannot update or fetch user profiles
app.use("/api/notifications", require("./routes/notificationsRoutes")); // Notifications //Cannot create, get, or clear notifications
app.use("/api/posts", require("./routes/postRoutes"));

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000; // Define server port // Cannot control which port server listens to

app.listen(PORT, "0.0.0.0", () => 
  console.log(`Server running on port ${PORT}`)
);
// :Server will not start
