import React from "react";
import TalentLine from "./TalentLine.js";
import "./TalentList.css";

function TalentList(props) {
  return (
    <div className="talentList-right-block-list">
      {props.talentList.map((element, index) => {
        return (
          <TalentLine
            talent={element}
            key={index}
            deleteCheckBox={id => {
              props.deleteCheckBox(id);
            }}
          />
        );
      })}
    </div>
  );
}

export default TalentList;
