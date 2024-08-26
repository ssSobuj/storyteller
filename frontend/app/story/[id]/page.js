"use client";

import { useFetcher } from "@/components/lib/useFetcher";
import React, { useState } from "react";

const StoryViewer = ({ params }) => {
  const id = params.id;
  const { data: story } = useFetcher(`/api/stories/${id}`);

  const [history, setHistory] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [selectedSubSubOption, setSelectedSubSubOption] = useState(null);

  const handleOptionClick = (option) => {
    setHistory((prev) => [
      ...prev,
      { selectedOption, selectedSubOption, selectedSubSubOption },
    ]);
    setSelectedOption(option);
    setSelectedSubOption(null);
    setSelectedSubSubOption(null);
  };

  const handleSubOptionClick = (subOption) => {
    setHistory((prev) => [
      ...prev,
      { selectedOption, selectedSubOption, selectedSubSubOption },
    ]);
    setSelectedSubOption(subOption);
    setSelectedSubSubOption(null);
  };

  const handleSubSubOptionClick = (subSubOption) => {
    setHistory((prev) => [
      ...prev,
      { selectedOption, selectedSubOption, selectedSubSubOption },
    ]);
    setSelectedSubSubOption(subSubOption);
  };

  const handleGoBack = () => {
    // Reset everything to the start
    setSelectedOption(null);
    setSelectedSubOption(null);
    setSelectedSubSubOption(null);
    setHistory([]); // Clear the history
  };

  const handleGoBackOneStep = () => {
    if (selectedSubSubOption) {
      setSelectedSubSubOption(null);
    } else if (selectedSubOption) {
      setSelectedSubOption(null);
    } else if (selectedOption) {
      setSelectedOption(null);
    }
  };

  return (
    <>
      {story && (
        <div className="story-viewer">
          <h1 className="story-title">{story.title}</h1>
          <p className="story-author">By {story.author}</p>
          <p className="story-content">{story.content}</p>

          {story.options && !selectedOption && (
            <div className="options">
              {story.options.map((option) => (
                <button
                  key={option.id}
                  className="option-button btn btn-primary"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.option}
                </button>
              ))}
            </div>
          )}

          {selectedOption && (
            <div className="selected-option">
              <p className="option-content">{selectedOption.content}</p>

              {selectedOption.subOptions && !selectedSubOption && (
                <div className="options">
                  {selectedOption.subOptions.map((subOption) => (
                    <button
                      key={subOption.id}
                      className="option-button btn btn-secondary"
                      onClick={() => handleSubOptionClick(subOption)}
                    >
                      {subOption.subOption}
                    </button>
                  ))}
                </div>
              )}

              {selectedSubOption && (
                <div className="selected-sub-option">
                  <p className="sub-option-content">
                    {selectedSubOption.subContent}
                  </p>

                  {selectedSubOption.subSubOptions && !selectedSubSubOption && (
                    <div className="options">
                      {selectedSubOption.subSubOptions.map((subSubOption) => (
                        <button
                          key={subSubOption.id}
                          className="option-button btn btn-tertiary"
                          onClick={() => handleSubSubOptionClick(subSubOption)}
                        >
                          {subSubOption.subSubOption}
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedSubSubOption && (
                    <div className="selected-sub-sub-option">
                      <p className="sub-sub-option-content">
                        {selectedSubSubOption.subSubContent}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="navigation-buttons">
            <button
              className="btn btn-warning"
              onClick={handleGoBack}
              disabled={
                !selectedOption && !selectedSubOption && !selectedSubSubOption
              }
            >
              Go Back to Start
            </button>
            <button
              className="btn btn-danger"
              onClick={handleGoBackOneStep}
              disabled={
                !selectedOption && !selectedSubOption && !selectedSubSubOption
              }
            >
              Go Back One Step
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryViewer;

// "use client";

// import { useFetcher } from "@/components/lib/useFetcher";
// import { useState } from "react";

// const storyData = {
//   intro: {
//     title: "The Hero’s Journey",
//     content: [
//       "You stand before the dark castle, the air thick with the smell of impending doom. Your loyal companion, a wise old wizard, warns you of the dangers that lie ahead.",
//       '"This is it, hero," he says. "Inside, the Dark Lord awaits. You must decide now—will you face him head-on, knowing you may perish, or will you seek another way to defeat him?"',
//     ],
//     choices: [
//       {
//         text: "Face the Dark Lord",
//         next: "direct-battle",
//       },
//       {
//         text: "Seek an Alternative",
//         next: "alternative",
//       },
//     ],
//   },
//   "direct-battle": {
//     title: "Direct Confrontation",
//     content: [
//       "You decide to confront the Dark Lord directly. Upon entering the castle, you encounter him. You must choose your approach.",
//       "Will you fight using powerful magic or rely on your physical strength?",
//     ],
//     choices: [
//       {
//         text: "Fight with Magic",
//         next: "magic-battle",
//       },
//       {
//         text: "Fight with Strength",
//         next: "strength-battle",
//       },
//     ],
//   },
//   alternative: {
//     title: "Seeking an Alternative",
//     content: [
//       "You choose to seek an alternative to direct confrontation. You have two options: perform a magic ritual to weaken the Dark Lord or gather intelligence to devise a plan.",
//     ],
//     choices: [
//       {
//         text: "Magic Ritual",
//         next: "magic-ritual",
//       },
//       {
//         text: "Espionage",
//         next: "espionage",
//       },
//     ],
//   },
//   "magic-battle": {
//     title: "The Magic Duel",
//     content: [
//       "Using powerful spells, you engage in a magical duel with the Dark Lord. The battle is intense, with spells clashing in the air.",
//       "Despite your efforts, the Dark Lord proves to be a formidable opponent. The battle ends with both of you exhausted, but ultimately, the Dark Lord emerges victorious.",
//     ],
//     choices: [],
//   },
//   "strength-battle": {
//     title: "The Strength Test",
//     content: [
//       "You engage the Dark Lord in physical combat. Using your strength and skill, you manage to land several blows.",
//       "However, the Dark Lord's power is overwhelming. In a final, climactic battle, you manage to defeat him, but at great personal cost.",
//     ],
//     choices: [],
//   },
//   "magic-ritual": {
//     title: "The Magic Ritual",
//     content: [
//       "You perform a powerful magic ritual to weaken the Dark Lord. The ritual is successful, but it requires a personal sacrifice.",
//       "The Dark Lord is now vulnerable. You can defeat him more easily, but the cost of the ritual has left you weakened.",
//     ],
//     choices: [
//       {
//         text: "Defeat the Dark Lord",
//         next: "defeat-dark-lord",
//       },
//       {
//         text: "The Ritual Fails",
//         next: "fail-ritual",
//       },
//     ],
//   },
//   espionage: {
//     title: "The Art of Espionage",
//     content: [
//       "You gather crucial intelligence about the Dark Lord’s weaknesses. Using this knowledge, you devise a plan to defeat him.",
//       "Your plan is executed with precision, leading to the Dark Lord’s defeat.",
//     ],
//     choices: [],
//   },
//   "defeat-dark-lord": {
//     title: "The Dark Lord Defeated",
//     content: [
//       "With the Dark Lord weakened by the ritual, you defeat him and restore peace to the kingdom.",
//     ],
//     choices: [],
//   },
//   "fail-ritual": {
//     title: "The Ritual Fails",
//     content: [
//       "Despite your efforts, the ritual fails, and the Dark Lord remains powerful. The kingdom is left in turmoil.",
//     ],
//     choices: [],
//   },
// };

// export default function StoryPage() {
//   const { data } = useFetcher("/api/stories");
//   const [storyParts, setStoryParts] = useState([{ id: 1, part: "intro" }]);

//   const handleChoice = (id, nextPart) => {
//     setStoryParts((prevParts) => [
//       ...prevParts.slice(0, id),
//       { id: id + 1, part: nextPart },
//     ]);
//   };

//   const handleBackOneStep = () => {
//     setStoryParts((prevParts) => prevParts.slice(0, -1));
//   };

//   const handleBackToStart = () => {
//     setStoryParts([{ id: 1, part: "intro" }]);
//   };

//   const renderStoryPart = (part, id, isLast) => {
//     const partData = storyData[part];
//     if (!partData) return <p key={id}>Story part not found.</p>;

//     return (
//       <div key={id}>
//         <h5>{partData.title}</h5>
//         {partData.content.map((text, index) => (
//           <p key={index} className="story-text">
//             {text}
//           </p>
//         ))}
//         {isLast && partData.choices.length > 0 && (
//           <div className="story-buttons">
//             {partData.choices.map((choice, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleChoice(id, choice.next)}
//                 className="button"
//               >
//                 {choice.text}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="story-details">
//       <div className="story-details__wrapper">
//         <div className="story-inner">
//           <div className="row">
//             <div className="col">
//               <div className="story-details__inner">
//                 {storyParts.map(({ id, part }, index) =>
//                   renderStoryPart(part, id, index === storyParts.length - 1)
//                 )}
//                 {storyParts.length > 1 && (
//                   <div className="story-buttons">
//                     {storyParts.length > 1 && (
//                       <button onClick={handleBackOneStep} className="button">
//                         Back One Step
//                       </button>
//                     )}
//                     <button onClick={handleBackToStart} className="button">
//                       Back to Start
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
