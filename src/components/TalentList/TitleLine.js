import React from "react";
import "./TitleLine.css";

function TitleLine(props) {
  const titleArray = [
    "Nom",
    "Fonction",
    "Entreprise",
    "Souhait",
    "Validé",
    "Statut",
    "Dernière modif."
  ];

  return (
    <div className="talentList-right-block-title">
      <div className="talentList-delete-block" />
      <div className="talentList-right-block-name">{titleArray[0]}</div>
      <div className="talentList-right-block-actualTitle">{titleArray[1]}</div>
      <div className="talentList-right-block-actualCompany">
        {titleArray[2]}
      </div>
      <div className="talentList-right-block-wantedTitle">{titleArray[3]}</div>
      <div className="talentList-right-block-validated">{titleArray[4]}</div>
      <div className="talentList-right-block-status">{titleArray[5]}</div>
      <div className="talentList-right-block-lastUpdate">{titleArray[6]}</div>
    </div>
  );
}

export default TitleLine;
