const Story = require("../models/Story");

const createStory = async (req, res) => {
  console.log("Received data:", req.body); // Log the received data
  const { id, title, author } = req.body;

  // Basic validation
  if (!id || !title || !author) {
    console.log("Missing required fields:", { id, title, author }); // Log which fields are missing
    return res.status(400).json({
      error: "Missing required fields: id, title, and author are required.",
    });
  }

  try {
    const story = new Story(req.body); // Since all other fields are optional, you can pass req.body directly
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    console.error("Error saving story:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStoryStats = async (req, res) => {
  try {
    const { choices } = req.body;
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    story.stats = story.stats || {};
    story.stats.choices = choices;

    await story.save();
    res.status(200).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createStory, getStories, getStoryById, updateStoryStats };
