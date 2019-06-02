import React from "react";
import "./TagFilter.css";

function TagFilter(props) {
  const {
    tagFilterInputValue,
    tagSuggestions,
    tagSuggestionsShown,
    onChangeTagInput,
    onClickTag,
    tagActiveSuggestion,
    onKeyDownTagInput,
    tagListFiltered,
    onDeleteAllTagClick,
    onSingleTagDeleteClick
  } = props;

  // Filtre de la tagList en fonction de ce qui est dans l'input
  // let tagListFiltered = tagList.filter(element => {
  //   return (
  //     element.name.toLowerCase().indexOf(tagFilterInputValue.toLowerCase()) > -1
  //   );
  // });
  // Création de la div avec les suggestions
  let suggestionsList = null;

  if (tagFilterInputValue && tagSuggestionsShown) {
    if (tagListFiltered.length) {
      suggestionsList = (
        <div className="tagList-suggestions">
          {tagListFiltered.map((tag, index) => {
            let className;
            if (index === tagActiveSuggestion) {
              className = "tagList-suggestion-active";
            }
            return (
              <div
                className={className}
                onClick={() => {
                  onClickTag(tag);
                }}
                key={tag.name}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
      );
    } else {
      suggestionsList = (
        <div class="tagList-no-suggestions">
          <em>Pas de tag correspondant</em>
        </div>
      );
    }
  }

  return (
    <div className="tagList-filterBlock">
      <div className="tagList-filterTitle">Filtres</div>
      <div className="tagList">
        {tagSuggestions.length > 0 &&
          tagSuggestions.map((element, index) => {
            return (
              <div
                key={element.name}
                className={
                  element.type === "hard"
                    ? "tagList-tagShown hardSkill"
                    : "tagList-tagShown softSkill"
                }
              >
                {element.name}
                <div
                  className="tagList-deleteSingleTag"
                  onClick={() => onSingleTagDeleteClick(index)}
                >
                  X
                </div>
              </div>
            );
          })}

        <div className="tagList-input-block">
          <input
            className="tagFilterInput"
            placeholder="Write your tag"
            value={tagFilterInputValue}
            onChange={event => onChangeTagInput(event.target.value)}
            onKeyDown={onKeyDownTagInput}
          />
          {suggestionsList}
        </div>
      </div>
      <div>
        <div className="tagList-deleteAllTag" onClick={onDeleteAllTagClick}>
          X
        </div>
      </div>
    </div>
  );
}

export default TagFilter;
