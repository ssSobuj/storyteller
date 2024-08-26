const mongoose = require("mongoose");

const SubSubOptionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  subSubOption: { type: String, required: true },
  subSubContent: { type: String, required: true },
});

const SubOptionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  subOption: { type: String, required: true },
  subContent: { type: String, required: true },
  subSubOptions: [SubSubOptionSchema],
});

const OptionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  option: { type: String, required: true },
  content: { type: String, required: true },
  subOptions: [SubOptionSchema],
});

const StorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  options: [OptionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Story", StorySchema);
