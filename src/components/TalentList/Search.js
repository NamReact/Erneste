import React from "react";
import "./Search.css";

function Search(props) {
  return (
    <div className="tools-search">
      <i class="fas fa-search" />
      <input
        className="tools-search-input"
        value={props.searchInput}
        placeholder="Rechercher un profil"
        onChange={event => {
          props.searchType(event.target.value);
        }}
      />
    </div>
  );
}

export default Search;
