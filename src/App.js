import React, { useState, useEffect } from 'react';
import 'intro.js/introjs.css';
import introJs from 'intro.js';
import './App.css';
import Countries from './Countries';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  let introInstance = null;

  const firstStep = [
    {
      element: '.search-box',
      intro: 'Type a country name here.',
      position: 'left',
    },
  ];

  const secondStep = [
    {
      element: '#first-suggestion',
      intro: `Click on "${suggestions[0]}".`,
      position: 'right',
    },
  ];

  const thirdStep = [
    {
      element: '#search',
      intro: 'For result click on "Search".',
      position: 'bottom',
    },
  ];

  useEffect(() => {
    const hasTourCompleted = localStorage.getItem('tourCompleted');
    if (hasTourCompleted === 'true') {
      return;
    }

    setTimeout(() => {
      introInstance = introJs();
      introInstance.onexit(() => {
        localStorage.setItem('tourCompleted', 'true');
      });

      let stepsToUse = [];
      if (suggestions.length > 0) {
        stepsToUse = secondStep;
      } else if (isSuggestionSelected) {
        stepsToUse = thirdStep;
      } else {
        stepsToUse = firstStep;
      }

      introInstance.setOptions({
        steps: stepsToUse,
        tooltipClass: 'custom-tooltip',
      });

      introInstance.start();
    });
  }, [suggestions]);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = Countries.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedSuggestion('');
    setIsSuggestionSelected(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setInputValue('');
    setIsSuggestionSelected(true);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleClearSelectedSuggestion = () => {
    setSelectedSuggestion('');
    setInputValue('');
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
      <div className={`search-container ${isInputFocused ? 'focused' : ''}`}>
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
            <button className="close-button" onClick={handleClearSelectedSuggestion}>
              X
            </button>
          </div>
        )}
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              id={index === 0 ? 'first-suggestion' : undefined}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
      <button id="search" onClick={handleSearchButtonClick}>
        Search
      </button>
    </div>
  );
}

export default App;
