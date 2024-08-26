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
  "https://storytelling-platform-mefoty4oa-md-sobuj-hridoys-projects.vercel.app",
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

app.options(
  "",
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
  res.status(500).json({ error: "Something went wrong!" });
});

// Graceful Shutdown
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

module.exports = app;
