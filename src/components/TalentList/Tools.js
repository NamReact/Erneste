import React from "react";
import Search from "./Search";
import AddTalent from "./AddTalent";
import DeleteButton from "./DeleteButton";

import "./Tools.css";
function Tools(props) {
  return (
    <div className="talentList-right-block-researchLine">
      <div className="talentList-delete-block" />
      <Search
        searchInput={props.searchInput}
        searchType={event => {
          props.searchType(event);
        }}
      />
      <AddTalent />
      {props.delete === true && (
        <DeleteButton deleteClick={props.deleteClick} />
      )}
    </div>
  );
}

export default Tools;
