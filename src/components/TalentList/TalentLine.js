import React from "react";
import "./TalentLine.css";
import { Link } from "react-router-dom";

function TalentLine(props) {
  const { talent } = props;
  let deleteCheckBoxStyle = talent.delete
    ? "deleteBox deleteCheck"
    : "deleteBox deleteUncheck";
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
        {talent.informations.wantedTitle}
      </div>
      <div className="talentList-right-block-validated">{talent.validated}</div>
      <div className="talentList-right-block-status">{talent.status}</div>
      <div className="talentList-right-block-lastUpdate">
        {talent.lastUpdate}
      </div>
    </div>
  );
}

export default TalentLine;
