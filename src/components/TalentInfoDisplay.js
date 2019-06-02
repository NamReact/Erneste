import React from "react";
import axios from "axios";

class TalentInfoDisplay extends React.Component {
  state = {
    informations: null,
    lastUpdate: null
  };

  infoCheck = info => {
    if (!info) {
      return <div style={{ color: "#a8b0d0" }}>Non renseigné</div>;
    }
    return info;
  };

  render() {
    if (this.state.informations === null) {
      return <div />;
    }
    const informations = this.state.informations;
    const lastUpdate = this.state.lastUpdate;
    const formatUpdate = lastUpdate
      .split(",")
      .shift()
      .split(" ")
      .join("/");
    let dotColor = "";

    if (this.state.informations.status === "Recherche active") {
      dotColor = "#9EBA83";
    }
    if (this.state.informations.status === "Ouvert(e) aux opportunités") {
      dotColor = "#F2E9A7";
    }
    if (this.state.informations.status === "Ne pas être contacter") {
      dotColor = "#FF9D9D";
    }
    if (this.state.informations.status === "Embauché(e) par Erneste") {
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
          *
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
                borderWidth: this.state.informations.status ? "none" : "1px",
                borderStyle: this.state.informations.status ? "none" : "solid"
              }}
            />
            {this.state.informations.status}
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
            {this.state.informations.wantedSector.map((item, index) => {
              return <div key={index}>{item.name}</div>;
            })}
          </div>
          <div className="display-div">
            {informations.size ? (
              informations.size + " entreprise"
            ) : (
              <div style={{ color: "#a8b0d0" }}>Non renseigné</div>
            )}
          </div>
          <div className="display-div">
            {this.infoCheck(informations.actualTitle)}
          </div>
          <div className="display-div">
            {this.state.informations.wantedTitle.map((item, index) => {
              return <div key={index}>{item.name}</div>;
            })}
          </div>
        </div>
        <div className="display-update">Modifé le {formatUpdate}</div>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/" + this.props.id,
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({
      informations: response.data.informations,
      lastUpdate: response.data.lastUpdate
    });
  }
}

export default TalentInfoDisplay;
