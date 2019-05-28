import React from "react";
import "./AddTalent.css";

function AddTalent(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.addTalent();
        }}
      >
        Ajouter un talent
      </button>
    </div>
  );
}

export default AddTalent;
