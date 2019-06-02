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

      {/* Bouton qui apparait lorsqu'on click sur un talent à supprimer */}
      {props.delete === true && (
        <DeleteButton deleteClick={props.deleteClick} />
      )}

      {/* Bouton qui apparait lorsqu'un filtre en chevron est sélectionné */}
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
