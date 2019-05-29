import React from "react";
import "./TagFilter.css";

function TagFilter(props) {
  const {
    tagList,
    tagFilterInputValue,
    handleChangeTagFilterInput,
    handleClickTagFilter,
    tagFilterShown
  } = props;

  // On filtre le tagList en fonction de ce qui est dans l'input
  let tagListCopieFilter = tagList.filter(element => {
    return element.name
      .toLowerCase()
      .includes(tagFilterInputValue.toLowerCase());
  });
  return (
    <div>
      <div>filtres</div>
      <div className="tagList">
        {tagFilterShown.map(element => {
          return (
            <div
              className={
                element.type === "hard"
                  ? "tagList-tagShown hardSkill"
                  : "tagList-tagShown softSkill"
              }
            >
              {element.name}
            </div>
          );
        })}
        <div className="tagList-input-block">
          <input
            className="tagList-input"
            value={tagFilterInputValue}
            placeholder="Write your tag"
            onChange={event => handleChangeTagFilterInput(event.target.value)}
          />
          {tagFilterInputValue !== "" && (
            <div className="tagList-proposition">
              {tagListCopieFilter.map(tag => {
                console.log(tag);
                // console.log(tag.name);
                // console.log(tag.type);
                return (
                  <div
                    onClick={() => {
                      handleClickTagFilter(tag);
                    }}
                    key={tag.name}
                  >
                    {tag.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div>
        <button>Filtrer</button>
        <button>X</button>
      </div>
    </div>
  );
}

export default TagFilter;
