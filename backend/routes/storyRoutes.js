const express = require("express");
const {
  createStory,
  getStories,
  getStoryById,
  updateStoryStats,
} = require("../controllers/storyController");

const router = express.Router();

router.post("/", createStory);
router.get("/", getStories);
router.get("/:id", getStoryById);
router.put("/:id/stats", updateStoryStats);

module.exports = router;
