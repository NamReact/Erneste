import React from "react";
import "./AutoComplete.css";

function AutoComplete(props) {
  const {
    activeSuggestion,
    suggestionsList,
    showSuggestions,
    handleChangeTagFilterInput,
    handleClickTagFilter,
    userInput,
    onChange,
    onKeyDown,
    onClick
  } = props;

  let suggestionsListComponent;
  if (showSuggestions && userInput) {
    if (suggestionsList.length) {
      suggestionsListComponent = (
        <div class="suggestions">
          {suggestionsList.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <div className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </div>
            );
          })}
        </div>
      );
    } else {
      suggestionsListComponent = (
        <div class="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }
  return (
    <div className="test">
      <input
        className="tagFilterInput"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </div>
  );
}

export default AutoComplete;
