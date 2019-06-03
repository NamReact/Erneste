import React from "react";
import "./AddTalent.css";
import { Link } from "react-router-dom";

function AddTalent(props) {
  return (
    <Link to={`/admin/talent-create`}>
      <div className="all-button-add-talent">
        <div>
          <i class="fas fa-plus" />
        </div>
        <button className="addTalentButton">Ajouter un talent</button>
      </div>
    </Link>
  );
}

export default AddTalent;
