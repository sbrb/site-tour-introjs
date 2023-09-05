// import React, { useState, useEffect } from 'react';
// import 'intro.js/introjs.css';
// import introJs from 'intro.js';
// import './App.css';
// import Countries from './Countries';


// function App() {
//   const [inputValue, setInputValue] = useState('');
//   const [selectedSuggestion, setSelectedSuggestion] = useState('');
//   const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [isInputFocused, setInputFocused] = useState(false);
//   let introInstance = null;

//   const firstStep = [
//     {
//       element: '.search-box',
//       intro: 'Type a country name here.',
//       position: 'left',
//     },
//   ];

//   const secondStep = [
//     {
//       element: '#first-suggestion',
//       intro: `Click on "${suggestions[0]}".`,
//       position: 'right',
//     },
//   ];

//   const thirdStep = [
//     {
//       element: '#search',
//       intro: 'For result click on "Search".',
//       position: 'bottom',
//     },
//   ];

//   useEffect(() => {
//     const hasTourCompleted = localStorage.getItem('tourCompleted');
//     if (hasTourCompleted === 'true') {
//       return;
//     }

//     setTimeout(() => {
//       introInstance = introJs();
//       introInstance.onexit(() => {
//         localStorage.setItem('tourCompleted', 'true');
//       });

//       let stepsToUse = [];
//       if (suggestions.length > 0) {
//         stepsToUse = secondStep;
//       } else if (isSuggestionSelected) {
//         stepsToUse = thirdStep;
//       } else {
//         stepsToUse = firstStep;
//       }

//       introInstance.setOptions({
//         steps: stepsToUse,
//         tooltipClass: 'custom-tooltip',
//       });

//       introInstance.start();
//     });
//   }, [suggestions]);

//   useEffect(() => {
//     if (inputValue.trim() === '') {
//       setSuggestions([]);
//     } else {
//       const filteredSuggestions = Countries.filter((suggestion) =>
//         suggestion.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     }
//   }, [inputValue]);

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//     setSelectedSuggestion('');
//     setIsSuggestionSelected(false);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSelectedSuggestion(suggestion);
//     setInputValue('');
//     setIsSuggestionSelected(true);
//   };

//   const handleInputFocus = () => {
//     setInputFocused(true);
//   };

//   const handleInputBlur = () => {
//     setInputFocused(false);
//   };

//   const handleClearSelectedSuggestion = () => {
//     setSelectedSuggestion('');
//     setInputValue('');
//     setIsSuggestionSelected(false);
//   };

//   const handleSearchButtonClick = () => {
//     if (introInstance) {
//       introInstance.exit();
//     }
//     alert(`Searching for: ${selectedSuggestion}`);
//   };

//   return (
//     <div className="App">
//       <div className={`search-container ${isInputFocused ? 'focused' : ''}`}>
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Type A Country Name..."
//             value={inputValue}
//             onChange={handleInputChange}
//             onFocus={handleInputFocus}
//             onBlur={handleInputBlur}
//           />
//         </div>

//         {selectedSuggestion && (
//           <div className="selected-suggestion">
//             <span>{selectedSuggestion}</span>
//             <button className="close-button" onClick={handleClearSelectedSuggestion}>
//               X
//             </button>
//           </div>
//         )}
//         <ul className="suggestions">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//               id={index === 0 ? 'first-suggestion' : undefined}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button id="search" onClick={handleSearchButtonClick}>
//         Search
//       </button>
//     </div>
//   );
// }

// export default App;










import React, { useState, useEffect } from "react";
import "intro.js/introjs.css";
import introJs from "intro.js";
import "./App.css";
import Countries from "./Countries";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [tourStarted, setTourStarted] = useState(false);
  let introInstance = null;

  const firstStep = [
    {
      element: ".search-box",
      intro: "Type a country name here.",
      position: "left",
    },
  ];

  const secondStep = [
    {
      element: "#first-suggestion",
      intro: `Click on "${suggestions[0]}".`,
      position: "right",
    },
  ];

  const secondStepError = [
    {
      element: ".search-box",
      intro: `Invalid "${inputValue}" keyword.`,
      position: "left",
    },
  ];

  const thirdStep = [
    {
      element: "#search",
      intro: 'For result, click on "Search".',
      position: "bottom",
    },
  ];

  const startTour = () => {
    setTourCompleted(true);
    setTourStarted(true);
    introInstance = introJs();

    introInstance.setOptions({
      steps: firstStep,
      tooltipClass: "custom-tooltip",
    });

    introInstance.start();
  };

  useEffect(() => {
    const hasTourCompleted = localStorage.getItem("tourCompleted");
    if (hasTourCompleted === "true") {
      return;
    }

    setTimeout(() => {
      introInstance = introJs();
      introInstance.onexit(() => {
        localStorage.setItem("tourCompleted", "true");
      });

      let stepsToUse = [];
      if (suggestions.length > 0) {
        stepsToUse = secondStep;
      } else if (isSuggestionSelected) {
        stepsToUse = thirdStep;
      } else if (suggestions.length === 0 && tourStarted) {
        stepsToUse = secondStepError;
        if (!inputValue) {
          stepsToUse = firstStep;
        }
      }

      introInstance.setOptions({
        steps: stepsToUse,
        tooltipClass: "custom-tooltip",
      });

      introInstance.start();
    });
  }, [suggestions, inputValue]);

  useEffect(() => {
    const hasTourCompleted = localStorage.getItem("tourCompleted");
    if (hasTourCompleted === "true") {
      setTourCompleted(true);
      return;
    }
  }, [tourCompleted]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = Countries.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [inputValue]);

  const startTourHandel = () => {
    setTourCompleted(false);
    localStorage.setItem("tourCompleted", "false");
    startTour()
  };

  const skipTour = () => {
    setTourCompleted(true);
    localStorage.setItem("tourCompleted", "true");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedSuggestion("");
    setIsSuggestionSelected(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setInputValue("");
    setIsSuggestionSelected(true);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleClearSelectedSuggestion = () => {
    setSelectedSuggestion("");
    setInputValue("");
    setIsSuggestionSelected(false);
  };

  const handleSearchButtonClick = () => {
    if (introInstance) {
      introInstance.exit();
    }
    alert(`Searching for: ${selectedSuggestion}`);
  };

  return (
    <div className="App">
      <div className={`search-container ${isInputFocused ? "focused" : ""}`}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Type A Country Name..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>

        {selectedSuggestion && (
          <div className="selected-suggestion">
            <span>{selectedSuggestion}</span>
            <button
              className="close-button"
              onClick={handleClearSelectedSuggestion}
            >
              X
            </button>
          </div>
        )}
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              id={index === 0 ? "first-suggestion" : undefined}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
      <div className="groupButton">
        <button onClick={startTourHandel} style={{ backgroundColor: "red" }}>
          Start Tour
        </button>
        <button id="search" onClick={handleSearchButtonClick}>
          Search
        </button>
      </div>

      <div
        className="popup"
        style={{ display: !tourCompleted ? "block" : "none" }}
      >
        <p>Welcome to the tour!</p>
        <button onClick={skipTour} style={{ backgroundColor: "red" }}>
          Skip
        </button>
        <button onClick={startTour} style={{ backgroundColor: "green" }}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default App;
