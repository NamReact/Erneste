import React from "react";
import "./DeleteButton.css";

function DeleteButton(props) {
  return (
    <div className="deleteButton">
      <i className="far fa-trash-alt fa-2x" />
      <div
        className="text-delete-button"
        onClick={() => {
          props.deleteClick();
        }}
      >
        Supprimer les profils séléctionnés
      </div>
    </div>
  );
}

export default DeleteButton;
