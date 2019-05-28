import React from "react";
import "./AddTalent.css";
import { Link } from "react-router-dom";

function AddTalent(props) {
  return (
    <div>
      <Link to={`/admin/talent-create`}>Ajouter un talent</Link>
    </div>
  );
}

export default AddTalent;
