import React from "react";
import Search from "./Search";
import AddTalent from "./AddTalent";
import DeleteButton from "./DeleteButton";

import "./Tools.css";
function Tools(props) {
  return (
    <div className="talentList-right-block-researchLine">
      <Search
        searchInput={props.searchInput}
        searchType={event => {
          props.searchType(event);
        }}
        onClickClearSearch={props.onClickClearSearch}
      />
      <AddTalent />

      {/* Button that appears when a talent is clicked to be deleted*/}
      {props.delete === true && (
        <DeleteButton deleteClick={props.deleteClick} />
      )}

      {/* Button that appears when a chevron is selected as filter */}
      {props.chevronFilter.length > 0 && (
        <div
          className="tools-deleteFilter"
          onClick={props.onDeleteChevronFilterClick}
        >
          Supprimer les filtres
        </div>
      )}
    </div>
  );
}

export default Tools;
