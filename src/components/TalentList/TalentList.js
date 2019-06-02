import React from "react";
import TalentLine from "./TalentLine.js";
import "./TalentList.css";

function TalentList(props) {
  const { talentList, deleteCheckBox } = props;

  return (
    <div className="talentList-right-block-list">
      {talentList.map((element, index) => {
        return (
          <TalentLine
            talent={element}
            key={index}
            deleteCheckBox={id => {
              deleteCheckBox(id);
            }}
          />
        );
      })}
    </div>
  );
}

export default TalentList;
