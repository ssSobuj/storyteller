const Story = require("../models/Story");

const createStory = async (req, res) => {
  const { title, author, content, options } = req.body;

  if (!title || !author || !content || !options) {
    return res
      .status(400)
      .json({ error: "Missing required fields or invalid data format." });
  }

  try {
    const story = new Story({
      title,
      author,
      content,
      options: options.map((option) => ({
        option: option.option,
        content: option.content,
        subOptions: option.subOptions.map((subOption) => ({
          subOption: subOption.subOption,
          subContent: subOption.subContent,
          subSubOptions: subOption.subSubOptions.map((subSubOption) => ({
            subSubOption: subSubOption.subSubOption,
            subSubContent: subSubOption.subSubContent,
          })),
        })),
      })),
    });

    await story.save();
    res.status(201).json(story);
  } catch (error) {
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
