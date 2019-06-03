import React from "react";
import "./Search.css";

function Search(props) {
  return (
    <div className="tools-search">
      <div>
        <i className="fas fa-search" />
        <input
          className="tools-search-input"
          value={props.searchInput}
          placeholder="Rechercher un profil"
          onChange={event => {
            props.searchType(event.target.value);
          }}
        />
      </div>

      <div onClick={props.onClickClearSearch}>
        <i className="fas fa-times" />
      </div>
    </div>
  );
}

export default Search;
