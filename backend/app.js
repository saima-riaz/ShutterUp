const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',  // frontend URL
  credentials: true                 // allow cookies
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

  app.use(fileUpload({
    useTempFiles: false, // We are not using disk storage
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  }));

  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/posts", require("./routes/postRoutes"));
  app.use("/api/gallery", require("./routes/galleryRoutes"));
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
