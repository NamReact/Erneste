import React from "react";
import "./Search.css";

function Search(props) {
  return (
    <div>
      <div className="talentList-delete-block" />
      <input
        value={props.searchInput}
        placeholder="recherche un profil"
        onChange={event => {
          props.searchType(event.target.value);
        }}
      />
    </div>
  );
}

export default Search;
