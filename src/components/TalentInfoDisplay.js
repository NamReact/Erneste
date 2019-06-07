import React from "react";
import axios from "axios";

class TalentInfoDisplay extends React.Component {
  infoCheck = info => {
    if (!info) {
      return <div style={{ color: "#a8b0d0" }}>Non renseigné</div>;
    }
    return info;
  };

  render() {
    /* if (this.state.informations === null) {
      return <div />;
    } */
    const informations = this.props.informations;
    const lastUpdate = this.props.lastUpdate;
    let formatUpdate = null;
    if (lastUpdate !== null) {
      formatUpdate = lastUpdate
        .split(",")
        .shift()
        .split(" ")
        .join("/");
    }

    let dotColor = "";

    if (informations.status === "Recherche active") {
      dotColor = "#9EBA83";
    }
    if (informations.status === "Ouvert(e) aux opportunités") {
      dotColor = "#F2E9A7";
    }
    if (informations.status === "Ne pas être contacté(e)") {
      dotColor = "#FF9D9D";
    }
    if (informations.status === "Embauché(e) par Erneste") {
      dotColor = "#6A6A8F";
    }
    return (
      <div className="leftContainer display-container">
        {informations.photo !== null ? (
          <span className="talent-picture-container">
            <img
              className="talent-picture"
              src={informations.photo}
              alt="portrait of talent"
            />
          </span>
        ) : (
          <div className="empty-photo">
            <div className="text-empty-picture">Pas de photo</div>
          </div>
        )}
        <div className="update-profile" onClick={this.props.setUpdate}>
          <i class="fas fa-cog" />
        </div>
        <div className="talentDetails talent-detail-display">
          <div className="first-name">
            {this.infoCheck(informations.firstName)}
          </div>
          <div className="first-name">
            {this.infoCheck(informations.lastName)}
          </div>
          <div className="availability-dot display-dot">
            <div
              style={{
                backgroundColor: dotColor,
                borderWidth: informations.status ? "none" : "1px",
                borderStyle: informations.status ? "none" : "solid"
              }}
            />
            {informations.status}
          </div>
          <div className="display-div">
            {this.infoCheck(informations.linkedIn)}
          </div>
          <div className="display-div">
            {this.infoCheck(informations.email)}
          </div>
          <div className="display-div">
            {this.infoCheck(informations.phoneNumber)}
          </div>
          <div className="display-div">
            {this.infoCheck(informations.salary)}
          </div>
          <div className="display-div">
            {this.infoCheck(informations.actualCompany)}
          </div>
          <div className="display-div">
            {informations.wantedSector.map((item, index) => {
              return <div key={index}>{item.name}</div>;
            })}
          </div>
          <div className="display-div">
            {informations.wantedSize ? (
              informations.wantedSize + " entreprise"
            ) : (
              <div style={{ color: "#a8b0d0" }}>Non renseigné</div>
            )}
          </div>
          <div className="display-div">
            {this.infoCheck(informations.actualTitle)}
          </div>
          <div className="display-div">
            {informations.wantedTitle.map((item, index) => {
              return <div key={index}>{item.name}</div>;
            })}
          </div>
        </div>
        <div className="display-update">Modifé le {formatUpdate}</div>
      </div>
    );
  }
}

export default TalentInfoDisplay;
