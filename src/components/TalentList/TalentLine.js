import React from "react";
import "./TalentLine.css";
import { Link } from "react-router-dom";

function TalentLine(props) {
  const { talent } = props;
  let deleteCheckBoxStyle = talent.delete
    ? "deleteBox deleteCheck"
    : "deleteBox deleteUncheck";

  let classNameStatus = "";

  if (talent.informations.status === "0") {
    classNameStatus = "statut0";
  }
  if (talent.informations.status === "Recherche active") {
    classNameStatus = "statut1";
  }
  if (talent.informations.status === "Ouvert(e) aux opportunités") {
    classNameStatus = "statut2";
  }
  if (talent.informations.status === "Ne pas être contacter") {
    classNameStatus = "statut3";
  }
  if (talent.informations.status === "Embauché(e) par Erneste") {
    classNameStatus = "statut4";
  }
  return (
    <div className="talentList-right-block-line">
      <div className="ericTest">
        <div
          className={deleteCheckBoxStyle}
          onClick={() => {
            props.deleteCheckBox(talent._id);
          }}
        />
      </div>
      {/* NAME */}
      <Link
        to={`/admin/talent/${talent._id}`}
        className="talentList-right-block-name"
      >
        {`${talent.informations.firstName} ${talent.informations.lastName}`}
      </Link>

      {/* ACTUAL TITLE */}
      <div className="talentList-right-block-actualTitle">
        {talent.informations.actualTitle}
      </div>

      {/* ACTUAL COMPANY */}
      <div className="talentList-right-block-actualCompany">
        {talent.informations.actualCompany}
      </div>

      {/* WANTED TITLE */}
      <div className="talentList-right-block-wantedTitle">
        {talent.informations.wantedTitle.map((element, index) => {
          return <div key={index}>{element}</div>;
        })}
      </div>

      {/* VALIDATED */}
      <div className="talentList-right-block-validated-line">
        {talent.validated === true && <i className="fas fa-check" />}
        {talent.validated === false && <i className="fas fa-times" />}
      </div>

      {/* STATUS */}
      <div className="talentList-right-block-status">
        <div className={classNameStatus} />
      </div>

      {/* LAST UPDATE*/}
      <div className="talentList-right-block-lastUpdate-line">
        {talent.lastUpdate}
      </div>
    </div>
  );
}

export default TalentLine;
