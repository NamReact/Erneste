import React from "react";
import "./TalentLine.css";
import { Link } from "react-router-dom";

function TalentLine(props) {
  const { talent } = props;
  return (
    <div className="talentList-right-block-line">
      <div className="talentList-delete-block">
        {talent.delete === undefined && (
          <input
            type="checkbox"
            onChange={() => {
              props.deleteCheckBox(talent._id);
            }}
          />
        )}
        {talent.delete === false && (
          <input
            type="checkbox"
            onChange={() => {
              props.deleteCheckBox(talent._id);
            }}
          />
        )}
        {talent.delete === true && (
          <input
            type="checkbox"
            checked
            onChange={() => {
              props.deleteCheckBox(talent._id);
            }}
          />
        )}
      </div>
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
