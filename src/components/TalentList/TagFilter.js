import React from "react";
import "./TagFilter.css";

function TagFilter(props) {
  return (
    <div>
      <div>filtres</div>
      <input placeholder="filtres à écrire" />
      <div>
        <button>Filtrer</button>
        <button>X</button>
      </div>
    </div>
  );
}

export default TagFilter;
