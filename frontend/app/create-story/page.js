"use client";
import axios from "@/components/lib/axios";
import { useState } from "react";

export default function CreateStory() {
  const [story, setStory] = useState({
    id: Date.now(),
    title: "",
    author: "",
    content: "",
    options: [],
  });
  const [isOptionGroupAdded, setIsOptionGroupAdded] = useState(false);

  const addOptionGroup = () => {
    if (!isOptionGroupAdded) {
      setStory({
        ...story,
        options: [
          ...story.options,
          {
            id: Date.now(),
            option: "Option A",
            content: "",
            subOptions: [],
          },
          {
            id: Date.now() + 1,
            option: "Option B",
            content: "",
            subOptions: [],
          },
        ],
      });
      setIsOptionGroupAdded(true);
    }
  };

  const addSubOption = (optionId) => {
    setStory({
      ...story,
      options: story.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              subOptions: [
                ...option.subOptions,
                {
                  id: Date.now(),
                  subOption: "Sub Option A",
                  subContent: "",
                  subSubOptions: [],
                },
                {
                  id: Date.now() + 1,
                  subOption: "Sub Option B",
                  subContent: "",
                  subSubOptions: [],
                },
              ].slice(0, 2),
            }
          : option
      ),
    });
  };

  const addSubSubOption = (optionId, subOptionId) => {
    setStory({
      ...story,
      options: story.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              subOptions: option.subOptions.map((subOption) =>
                subOption.id === subOptionId
                  ? {
                      ...subOption,
                      subSubOptions: [
                        ...subOption.subSubOptions,
                        {
                          id: Date.now(),
                          subSubOption: "Sub-Sub Option A",
                          subSubContent: "",
                        },
                        {
                          id: Date.now() + 1,
                          subSubOption: "Sub-Sub Option B",
                          subSubContent: "",
                        },
                      ].slice(0, 2),
                    }
                  : subOption
              ),
            }
          : option
      ),
    });
  };

  const removeOptionGroup = (optionId) => {
    setStory({
      ...story,
      options: story.options.filter((option) => option.id !== optionId),
    });
  };

  const removeSubOption = (optionId, subOptionId) => {
    setStory({
      ...story,
      options: story.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              subOptions: option.subOptions.filter(
                (subOption) => subOption.id !== subOptionId
              ),
            }
          : option
      ),
    });
  };

  const removeSubSubOption = (optionId, subOptionId, subSubOptionId) => {
    setStory({
      ...story,
      options: story.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              subOptions: option.subOptions.map((subOption) =>
                subOption.id === subOptionId
                  ? {
                      ...subOption,
                      subSubOptions: subOption.subSubOptions.filter(
                        (subSubOption) => subSubOption.id !== subSubOptionId
                      ),
                    }
                  : subOption
              ),
            }
          : option
      ),
    });
  };

  const handleChange = (field, value) => {
    setStory({
      ...story,
      [field]: value,
    });
  };

  const handleOptionChange = (optionId, field, value) => {
    setStory({
      ...story,
      options: story.options.map((option) =>
        option.id === optionId ? { ...option, [field]: value } : option
      ),
    });
  };

  const handleSubOptionChange = (optionId, subOptionId, field, value) => {
    setStory({
      ...story,
      options: story.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              subOptions: option.subOptions.map((subOption) =>
                subOption.id === subOptionId
                  ? { ...subOption, [field]: value }
                  : subOption
              ),
            }
          : option
      ),
    });
  };

  const handleSubSubOptionChange = (
    optionId,
    subOptionId,
    subSubOptionId,
    field,
    value
  ) => {
    setStory({
      ...story,
      options: story.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              subOptions: option.subOptions.map((subOption) =>
                subOption.id === subOptionId
                  ? {
                      ...subOption,
                      subSubOptions: subOption.subSubOptions.map(
                        (subSubOption) =>
                          subSubOption.id === subSubOptionId
                            ? { ...subSubOption, [field]: value }
                            : subSubOption
                      ),
                    }
                  : subOption
              ),
            }
          : option
      ),
    });
  };
  console.log(story);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", story);

    try {
      const response = await axios.post("/api/stories", story);
      console.log("Response:", response.data);
      setStory({
        id: Date.now(),
        title: "",
        author: "",
        content: "",
        options: [],
      });
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Failed to create story.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create a New Story</h1>
      <form onSubmit={handleSubmit}>
        <div className="story-part mb-4 border rounded p-3">
          <h5>Story Part {story.id}</h5>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Title"
                value={story.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="form-control mb-2"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Author"
                value={story.author}
                onChange={(e) => handleChange("author", e.target.value)}
                className="form-control mb-2"
                required
              />
            </div>
          </div>
          <textarea
            placeholder="Story content"
            rows="10"
            value={story.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="form-control mb-2"
            required
          />
          <div className="options-container">
            {story.options.map((option) => (
              <div key={option.id} className="option mb-3 border rounded p-3">
                <h6>Option Group {option.id}</h6>
                <input
                  type="text"
                  placeholder="Option"
                  value={option.option}
                  onChange={(e) =>
                    handleOptionChange(option.id, "option", e.target.value)
                  }
                  className="form-control mb-2"
                  required
                />
                <textarea
                  placeholder="Content for Option"
                  rows="3"
                  value={option.content}
                  onChange={(e) =>
                    handleOptionChange(option.id, "content", e.target.value)
                  }
                  className="form-control mb-2"
                  required
                />
                <div className="sub-options">
                  {option.subOptions.map((subOption) => (
                    <div
                      key={subOption.id}
                      className="sub-option mb-2 border rounded p-2"
                    >
                      <h6>Sub Option {subOption.id}</h6>
                      <input
                        type="text"
                        placeholder="Sub Option"
                        value={subOption.subOption}
                        onChange={(e) =>
                          handleSubOptionChange(
                            option.id,
                            subOption.id,
                            "subOption",
                            e.target.value
                          )
                        }
                        className="form-control mb-2"
                        required
                      />
                      <textarea
                        placeholder="Content for Sub Option"
                        rows="3"
                        value={subOption.subContent}
                        onChange={(e) =>
                          handleSubOptionChange(
                            option.id,
                            subOption.id,
                            "subContent",
                            e.target.value
                          )
                        }
                        className="form-control mb-2"
                        required
                      />
                      <div className="sub-sub-options">
                        {subOption.subSubOptions.map((subSubOption) => (
                          <div
                            key={subSubOption.id}
                            className="sub-sub-option mb-2 border rounded p-2"
                          >
                            <h6>Sub-Sub Option {subSubOption.id}</h6>
                            <input
                              type="text"
                              placeholder="Sub-Sub Option"
                              value={subSubOption.subSubOption}
                              onChange={(e) =>
                                handleSubSubOptionChange(
                                  option.id,
                                  subOption.id,
                                  subSubOption.id,
                                  "subSubOption",
                                  e.target.value
                                )
                              }
                              className="form-control mb-2"
                              required
                            />
                            <textarea
                              placeholder="Content for Sub-Sub Option"
                              rows="3"
                              value={subSubOption.subSubContent}
                              onChange={(e) =>
                                handleSubSubOptionChange(
                                  option.id,
                                  subOption.id,
                                  subSubOption.id,
                                  "subSubContent",
                                  e.target.value
                                )
                              }
                              className="form-control mb-2"
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeSubSubOption(
                                  option.id,
                                  subOption.id,
                                  subSubOption.id
                                )
                              }
                              className="btn btn-danger"
                            >
                              Remove Sub-Sub Option
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            addSubSubOption(option.id, subOption.id)
                          }
                          className="btn btn-primary"
                        >
                          Add Sub-Sub Option
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubOption(option.id, subOption.id)}
                        className="btn btn-danger mt-2"
                      >
                        Remove Sub Option
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSubOption(option.id)}
                    className="btn btn-primary"
                  >
                    Add Sub Option
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeOptionGroup(option.id)}
                  className="btn btn-danger mt-2"
                >
                  Remove Option Group
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOptionGroup}
              className="btn btn-primary"
            >
              Add Option Group
            </button>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Submit Story
          </button>
        </div>
      </form>
    </div>
  );
}
