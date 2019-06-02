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
  if (talent.informations.status === "1") {
    classNameStatus = "statut1";
  }
  if (talent.informations.status === "2") {
    classNameStatus = "statut2";
  }
  if (talent.informations.status === "3") {
    classNameStatus = "statut3";
  }
  if (talent.informations.status === "4") {
    classNameStatus = "statut4";
  }
  return (
    <div className="talentList-right-block-line">
      <div
        className={deleteCheckBoxStyle}
        onClick={() => {
          props.deleteCheckBox(talent._id);
        }}
      />
      <Link
        to={`/admin/talent/${talent._id}`}
        className="talentList-right-block-name"
      >
        {`${talent.informations.firstName} ${talent.informations.lastName}`}
      </Link>
      <div className="talentList-right-block-actualTitle">
        {talent.informations.actualTitle}
      </div>
      <div className="talentList-right-block-actualCompany">
        {talent.informations.actualCompany}
      </div>
      <div className="talentList-right-block-wantedTitle">
        {talent.informations.wantedTitle.map((element, index) => {
          return <div key={index}>{element}</div>;
        })}
      </div>
      <div className="talentList-right-block-validated-line">
        {talent.validated === true && <i className="fas fa-check fa-2x" />}
        {talent.validated === false && <i className="fas fa-times fa-2x" />}
      </div>
      <div className="talentList-right-block-status">
        <div className={classNameStatus} />
      </div>

      <div className="talentList-right-block-lastUpdate-line">
        {talent.lastUpdate}
      </div>
    </div>
  );
}

export default TalentLine;
