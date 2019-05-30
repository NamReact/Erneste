import React from "react";
import "./Title.css";

function Title(props) {
  return (
    <div>
      <div className="specialTitle">Talents</div>
      <div>{`Affichés : ${props.talentList.length}`}</div>
    </div>
  );
}

export default Title;
