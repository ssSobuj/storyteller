require("dotenv").config();
const express = require("express");
const cors = require("cors");
const storyRoutes = require("./routes/storyRoutes.js"); // Corrected the import path
const userRoutes = require("./routes/userRoutes.js");

const { connectDB } = require("./utils/db");

const app = express();

// Connect to the database
connectDB();
const allowedOrigins = [
  "https://storytelling-platform.vercel.app",
  "https://vercel.com/md-sobuj-hridoys-projects/storytelling-platform/Ac7u4DE3Yb1XRH9rHKk6dJHoQMXV",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("SIGINT received: closing HTTP server and MongoDB connection");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing HTTP server and MongoDB connection");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

module.exports = app;
