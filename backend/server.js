const app = require("./app");

// Check for Vercel dev environment or other local setup
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001; // Use a different port if 5000 is in use
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
  // For Vercel deployment, export the app
  module.exports = app;
}
