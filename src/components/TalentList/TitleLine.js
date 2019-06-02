import React from "react";
import "./TitleLine.css";

function TitleLine(props) {
  const {
    titleArray,
    chevronClickedPosition,
    chevronFilter,
    talentListNonFiltered,
    ArrayOfFilteredTalentList
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

  // Create an array with only actualTitle displayed
  const actualTitleArray = [];
  let actualTitlePosition = chevronFilter
    .map(element => {
      return element.title;
    })
    .indexOf("actualTitle");
  let actualTitleListOfReference = [];

  if (actualTitlePosition === -1) {
    actualTitleListOfReference =
      ArrayOfFilteredTalentList[ArrayOfFilteredTalentList.length - 1];
  } else {
    actualTitleListOfReference = ArrayOfFilteredTalentList[actualTitlePosition];
  }
  if (actualTitleListOfReference) {
    for (let i = 0; i < talentListNonFiltered.length; i++) {
      if (
        actualTitleArray.indexOf(
          talentListNonFiltered[i].informations.actualTitle
        ) === -1
      ) {
        actualTitleArray.push(
          talentListNonFiltered[i].informations.actualTitle
        );
      }
    }
  }
  actualTitleArray.sort();

  // Create an array with only actualCompany displayed
  const actualCompanyArray = [];
  let actualCompanyPosition = chevronFilter
    .map(element => {
      return element.title;
    })
    .indexOf("actualCompany");

  let actualCompanyListOfReference = [];

  if (actualCompanyPosition === -1) {
    actualCompanyListOfReference =
      ArrayOfFilteredTalentList[ArrayOfFilteredTalentList.length - 1];
  } else {
    actualCompanyListOfReference =
      ArrayOfFilteredTalentList[actualCompanyPosition];
  }
  if (actualCompanyListOfReference) {
    for (let i = 0; i < actualCompanyListOfReference.length; i++) {
      if (
        actualCompanyArray.indexOf(
          actualCompanyListOfReference[i].informations.actualCompany
        ) === -1
      ) {
        actualCompanyArray.push(
          actualCompanyListOfReference[i].informations.actualCompany
        );
      }
    }
  }
  actualCompanyArray.sort();

  // Create an array with only wantedTitle displayed
  const wantedTitleArray = [];
  let wantedTitlePosition = chevronFilter
    .map(element => {
      return element.title;
    })
    .indexOf("wantedTitle");
  let wantedTitleListOfReference = [];

  if (wantedTitlePosition === -1) {
    wantedTitleListOfReference =
      ArrayOfFilteredTalentList[ArrayOfFilteredTalentList.length - 1];
  } else {
    wantedTitleListOfReference = ArrayOfFilteredTalentList[wantedTitlePosition];
  }
  if (wantedTitleListOfReference) {
    for (let i = 0; i < wantedTitleListOfReference.length; i++) {
      for (
        let j = 0;
        j < wantedTitleListOfReference[i].informations.wantedTitle.length;
        j++
      ) {
        if (
          wantedTitleArray.indexOf(
            wantedTitleListOfReference[i].informations.wantedTitle[j]
          ) === -1
        ) {
          wantedTitleArray.push(
            wantedTitleListOfReference[i].informations.wantedTitle[j]
          );
        }
      }
    }
  }
  wantedTitleArray.sort();

  // Create an array with only Validated displayed
  const validatedArray = [];
  let validatedPosition = chevronFilter
    .map(element => {
      return element.title;
    })
    .indexOf("validated");
  let validatedListOfReference = [];

  if (validatedPosition === -1) {
    validatedListOfReference =
      ArrayOfFilteredTalentList[ArrayOfFilteredTalentList.length - 1];
  } else {
    validatedListOfReference = ArrayOfFilteredTalentList[validatedPosition];
  }
  if (validatedListOfReference) {
    for (let i = 0; i < validatedListOfReference.length; i++) {
      if (
        validatedArray.indexOf(
          validatedListOfReference[i].validated.toString()
        ) === -1
      ) {
        validatedArray.push(validatedListOfReference[i].validated.toString());
      }
    }
  }
  validatedArray.sort();

  // Create an array with only status displayed
  const statusArray = [];
  let statusPosition = chevronFilter
    .map(element => {
      return element.title;
    })
    .indexOf("status");
  let statusListOfReference = [];

  if (statusPosition === -1) {
    statusListOfReference =
      ArrayOfFilteredTalentList[ArrayOfFilteredTalentList.length - 1];
  } else {
    statusListOfReference = ArrayOfFilteredTalentList[statusPosition];
  }
  if (statusListOfReference) {
    for (let i = 0; i < statusListOfReference.length; i++) {
      if (
        statusArray.indexOf(statusListOfReference[i].informations.status) === -1
      ) {
        statusArray.push(statusListOfReference[i].informations.status);
      }
    }
  }
  statusArray.sort();

  // Create an array with only lastUpdate displayed
  const lastUpdateArray = [];
  let lastUpdatePosition = chevronFilter
    .map(element => {
      return element.title;
    })
    .indexOf("lastUpdate");
  let lastUpdateListOfReference = [];

  if (lastUpdatePosition === -1) {
    lastUpdateListOfReference =
      ArrayOfFilteredTalentList[ArrayOfFilteredTalentList.length - 1];
  } else {
    lastUpdateListOfReference = ArrayOfFilteredTalentList[lastUpdatePosition];
  }
  if (lastUpdateListOfReference) {
    for (let i = 0; i < lastUpdateListOfReference.length; i++) {
      if (
        lastUpdateArray.indexOf(lastUpdateListOfReference[i].lastUpdate) === -1
      ) {
        lastUpdateArray.push(lastUpdateListOfReference[i].lastUpdate);
      }
    }
  }

  return (
    <div className="talentList-right-block-title">
      <div className="deleteBox deleteUncheck" />
      {/* NAME */}
      <div className="talentList-right-block-name">{titleArray[0].value}</div>

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
                for (let j = 0; j < chevronFilter[i].filter.length; j++) {
                  if (
                    chevronFilter[i].filter[j] === element &&
                    chevronFilter[i].title === "actualTitle"
                  ) {
                    clicked = true;
                  }
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
                for (let j = 0; j < chevronFilter[i].filter.length; j++) {
                  if (
                    chevronFilter[i].filter[j] === element &&
                    chevronFilter[i].title === "actualCompany"
                  ) {
                    clicked = true;
                  }
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
      <div className="talentList-right-block-wantedTitle-title">
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
                for (let j = 0; j < chevronFilter[i].filter.length; j++) {
                  if (
                    chevronFilter[i].filter[j] === element &&
                    chevronFilter[i].title === "wantedTitle"
                  ) {
                    clicked = true;
                  }
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
                for (let j = 0; j < chevronFilter[i].filter.length; j++) {
                  if (
                    chevronFilter[i].filter[j] === element &&
                    chevronFilter[i].title === "validated"
                  ) {
                    clicked = true;
                  }
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
                for (let j = 0; j < chevronFilter[i].filter.length; j++) {
                  if (
                    chevronFilter[i].filter[j] === element &&
                    chevronFilter[i].title === "status"
                  ) {
                    clicked = true;
                  }
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
                for (let j = 0; j < chevronFilter[i].filter.length; j++) {
                  if (
                    chevronFilter[i].filter[j] === element &&
                    chevronFilter[i].title === "lastUpdate"
                  ) {
                    clicked = true;
                  }
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
