import React from "react";
import "./AddTalent.css";
import { Link } from "react-router-dom";

function AddTalent(props) {
  return (
    <Link to={`/admin/talent-create`}>
      <div className="toolsAddTalent">Ajouter un talent</div>
    </Link>
  );
}

export default AddTalent;
