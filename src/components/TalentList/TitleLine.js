import React from "react";
import "./TitleLine.css";

function TitleLine(props) {
  const {
    titleArray,
    chevronClickedPosition,
    talentList,
    chevronFilter
  } = props;

  // test if a chevron is clicked. If it is, the chvronClicked becomes true to enable the filter choice to appear
  let chevronClicked = false;
  for (let i = 0; i < titleArray.length; i++) {
    if (titleArray[i].clicked === true) {
      chevronClicked = true;
      break;
    } else {
      chevronClicked = false;
    }
  }

  // Create an array with only name
  const nameArray = [];
  for (let i = 0; i < talentList.length; i++) {
    if (
      nameArray.indexOf(
        `${talentList[i].informations.firstName} ${
          talentList[i].informations.lastName
        }`
      ) === -1
    ) {
      nameArray.push(
        `${talentList[i].informations.firstName} ${
          talentList[i].informations.lastName
        }`
      );
    }
  }
  nameArray.sort();

  // Create an array with only function
  const actualTitleArray = [];
  for (let i = 0; i < talentList.length; i++) {
    if (
      actualTitleArray.indexOf(talentList[i].informations.actualTitle) === -1
    ) {
      actualTitleArray.push(talentList[i].informations.actualTitle);
    }
  }
  actualTitleArray.sort();

  // Create an array with only actualCompany
  const actualCompanyArray = [];
  for (let i = 0; i < talentList.length; i++) {
    if (
      actualCompanyArray.indexOf(talentList[i].informations.actualCompany) ===
      -1
    ) {
      actualCompanyArray.push(talentList[i].informations.actualCompany);
    }
  }
  actualCompanyArray.sort();

  // Create an array with wantedTitle
  const wantedTitleArray = [];
  for (let i = 0; i < talentList.length; i++) {
    if (
      wantedTitleArray.indexOf(talentList[i].informations.wantedTitle) === -1
    ) {
      wantedTitleArray.push(talentList[i].informations.wantedTitle);
    }
  }
  wantedTitleArray.sort();

  // Create an array with Validated
  const validatedArray = [];
  for (let i = 0; i < talentList.length; i++) {
    if (validatedArray.indexOf(talentList[i].validated.toString()) === -1) {
      validatedArray.push(talentList[i].validated.toString());
    }
  }
  validatedArray.sort();

  // Create an array with status
  const statusArray = [];
  for (let i = 0; i < talentList.length; i++) {
    if (statusArray.indexOf(talentList[i].informations.status) === -1) {
      statusArray.push(talentList[i].informations.status);
    }
  }
  statusArray.sort();

  // Create an array with lastUpdate
  const lastUpdateArray = [];
  for (let i = 0; i < talentList.length; i++) {
    if (lastUpdateArray.indexOf(talentList[i].lastUpdate) === -1) {
      lastUpdateArray.push(talentList[i].lastUpdate);
    }
  }
  lastUpdateArray.sort();

  return (
    <div className="talentList-right-block-title">
      <div className="deleteBox deleteUncheck" />
      {/* NAME */}
      <div className="talentList-right-block-name">
        {titleArray[0].value}
        <i
          className="fas fa-chevron-down"
          onClick={() => props.chevronClick(titleArray[0].value)}
        />
        {chevronClicked && chevronClickedPosition === 0 && (
          <div className="chevron-filter">
            {nameArray.map(element => {
              let clicked = false;
              for (let i = 0; i < chevronFilter.length; i++) {
                if (
                  chevronFilter[i].value === element &&
                  chevronFilter[i].type === "name"
                ) {
                  clicked = true;
                }
              }
              return (
                <div>
                  <input type="checkbox" />
                  <span>{element}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/*ACTUAL TITLE*/}
      <div className="talentList-right-block-actualTitle">
        {titleArray[1].value}
        <i
          className="fas fa-chevron-down"
          onClick={() => props.chevronClick(titleArray[1].value)}
        />
        {chevronClicked && chevronClickedPosition === 1 && (
          <div className="chevron-filter">
            {actualTitleArray.map((element, index) => {
              let clicked = false;
              for (let i = 0; i < chevronFilter.length; i++) {
                if (
                  chevronFilter[i].value === element &&
                  chevronFilter[i].type === "actualTitle"
                ) {
                  clicked = true;
                }
              }
              return (
                <div key={index} className="filter-line">
                  <div
                    className={
                      clicked
                        ? "deleteBox deleteCheck"
                        : "deleteBox deleteUncheck"
                    }
                    onClick={() => {
                      props.filterCheckBox("actualTitle", element);
                    }}
                  />
                  <div>{element}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* ACTUAL COMPANY */}
      <div className="talentList-right-block-actualCompany">
        {titleArray[2].value}
        <i
          className="fas fa-chevron-down"
          onClick={() => props.chevronClick(titleArray[2].value)}
        />
        {chevronClicked && chevronClickedPosition === 2 && (
          <div className="chevron-filter">
            {actualCompanyArray.map((element, index) => {
              let clicked = false;
              for (let i = 0; i < chevronFilter.length; i++) {
                if (
                  chevronFilter[i].value === element &&
                  chevronFilter[i].type === "actualCompany"
                ) {
                  clicked = true;
                }
              }
              return (
                <div key={index} className="filter-line">
                  <div
                    className={
                      clicked
                        ? "deleteBox deleteCheck"
                        : "deleteBox deleteUncheck"
                    }
                    onClick={() => {
                      props.filterCheckBox("actualCompany", element);
                    }}
                  />
                  <span>{element}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* WANTED TITLE */}
      <div className="talentList-right-block-wantedTitle">
        {titleArray[3].value}
        <i
          className="fas fa-chevron-down"
          onClick={() => props.chevronClick(titleArray[3].value)}
        />
        {chevronClicked && chevronClickedPosition === 3 && (
          <div className="chevron-filter">
            {wantedTitleArray.map((element, index) => {
              let clicked = false;
              for (let i = 0; i < chevronFilter.length; i++) {
                if (
                  chevronFilter[i].value === element &&
                  chevronFilter[i].type === "wantedTitle"
                ) {
                  clicked = true;
                }
              }
              return (
                <div key={index} className="filter-line">
                  <div
                    className={
                      clicked
                        ? "deleteBox deleteCheck"
                        : "deleteBox deleteUncheck"
                    }
                    onClick={() => {
                      props.filterCheckBox("wantedTitle", element);
                    }}
                  />
                  <span>{element}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* VALIDATED */}
      <div className="talentList-right-block-validated">
        {titleArray[4].value}
        <i
          className="fas fa-chevron-down"
          onClick={() => props.chevronClick(titleArray[4].value)}
        />
        {chevronClicked && chevronClickedPosition === 4 && (
          <div className="chevron-filter">
            {validatedArray.map((element, index) => {
              let clicked = false;
              for (let i = 0; i < chevronFilter.length; i++) {
                if (
                  chevronFilter[i].value === element &&
                  chevronFilter[i].type === "validated"
                ) {
                  clicked = true;
                }
              }
              return (
                <div key={index} className="filter-line">
                  <div
                    className={
                      clicked
                        ? "deleteBox deleteCheck"
                        : "deleteBox deleteUncheck"
                    }
                    onClick={() => {
                      props.filterCheckBox("validated", element);
                    }}
                  />
                  <span>{element}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* STATUS */}
      <div className="talentList-right-block-status">
        {titleArray[5].value}
        <i
          className="fas fa-chevron-down"
          onClick={() => props.chevronClick(titleArray[5].value)}
        />
        {chevronClicked && chevronClickedPosition === 5 && (
          <div className="chevron-filter">
            {statusArray.map((element, index) => {
              let clicked = false;
              for (let i = 0; i < chevronFilter.length; i++) {
                if (
                  chevronFilter[i].value === element &&
                  chevronFilter[i].type === "status"
                ) {
                  clicked = true;
                }
              }
              return (
                <div key={index} className="filter-line">
                  <div
                    className={
                      clicked
                        ? "deleteBox deleteCheck"
                        : "deleteBox deleteUncheck"
                    }
                    onClick={() => {
                      props.filterCheckBox("status", element);
                    }}
                  />
                  <span>{element}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* LAST UPDATE */}
      <div className="talentList-right-block-lastUpdate">
        {titleArray[6].value}
        <i
          className="fas fa-chevron-down"
          onClick={() => props.chevronClick(titleArray[6].value)}
        />
        {chevronClicked && chevronClickedPosition === 6 && (
          <div className="chevron-filter">
            {lastUpdateArray.map((element, index) => {
              let clicked = false;
              for (let i = 0; i < chevronFilter.length; i++) {
                if (
                  chevronFilter[i].value === element &&
                  chevronFilter[i].type === "lastUpdate"
                ) {
                  clicked = true;
                }
              }
              return (
                <div key={index} className="filter-line">
                  <div
                    className={
                      clicked
                        ? "deleteBox deleteCheck"
                        : "deleteBox deleteUncheck"
                    }
                    onClick={() => {
                      props.filterCheckBox("lastUpdate", element);
                    }}
                  />
                  <span>{element}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TitleLine;
