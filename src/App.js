import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import "./App.css";

class App extends React.Component {
  state = {
    status: "write" /* ou read */,
    picture: null,
    firstName: "",
    lastName: "",
    linkedIn: "",
    email: "",
    phone: "",
    wage: "",
    curCompany: "",
    sector: "",
    curPosition: "",
    desPosition: "",
    availability: 0,
    idealFirm: "",
    idealRole: "",
    idealEnvironment: "",
    ambitions: "",
    hardSkills: [],
    softSkills: []
  };

  onClick = () => {
    axios.post("https://ernest-server.herokuapp.com/talent/create", {
      informations: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phone,
        actualCompany: this.state.curCompany,
        mobility: this.state.availability,
        actualTitle: this.state.curPosition,
        wantedTitle: this.state.desPosition
      },
      description: {
        idealCompany: this.state.idealFirm,
        idealRole: this.state.idealRole,
        workingEnvironment: this.state.idealEnvironment,
        development: this.state.ambitions
      },
      skills: {
        soft: this.state.softSkills,
        hard: this.state.hardSkills
      }
    });
  };

  handleFiles = files => {
    this.setState({
      picture: files.base64
    });
  };

  render() {
    return (
      <div className="content">
        {/* left section */}
        <div className="leftContainer">
          <div>
            <ReactFileReader
              fileTypes={[".png", ".jpg"]}
              base64={true}
              multipleFiles={false}
              handleFiles={this.handleFiles}
            >
              {this.state.picture !== null ? (
                <span>
                  <img src={this.state.picture} alt="portrait of talent" />
                </span>
              ) : (
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: "red"
                  }}
                />
              )}
            </ReactFileReader>
          </div>

          <form className="talentDetails">
            <input
              name="First Name"
              value={this.state.firstName}
              placeholder="Prénom"
              onChange={e => {
                this.setState({ firstName: e.target.value });
              }}
            />
            <input
              name="Last Name"
              value={this.state.lastName}
              placeholder="NOM"
              onChange={e => {
                this.setState({ lastName: e.target.value });
              }}
            />
            <input
              name="LinkedIn Profil"
              value={this.state.linkedIn}
              placeholder="Profil LinkedIn"
              onChange={e => {
                this.setState({ linkedIn: e.target.value });
              }}
            />
            <input
              name="email"
              value={this.state.email}
              placeholder="adresse@email.com"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <input
              name="phone number"
              value={this.state.phone}
              placeholder="0XXXXXXX"
              onChange={e => {
                this.setState({ phone: e.target.value });
              }}
            />
            <input
              name="Wage"
              value={this.state.wage}
              placeholder="$$$$$$$$"
              onChange={e => {
                this.setState({ wage: e.target.value });
              }}
            />
            <input
              name="Current company"
              value={this.state.curCompany}
              placeholder="Entreprise actuelle"
              onChange={e => {
                this.setState({ curCompany: e.target.value });
              }}
            />
            <input
              name="Desired sector"
              value={this.state.sector}
              placeholder="Secteur Souhaité"
              onChange={e => {
                this.setState({ sector: e.target.value });
              }}
            />
            <input
              name="Current position"
              value={this.state.curPosition}
              placeholder="Fonction actuelle"
              onChange={e => {
                this.setState({ curPosition: e.target.value });
              }}
            />
            <input
              name="Desired Position"
              value={this.state.desPosition}
              placeholder="Position souhaitée"
              onChange={e => {
                this.setState({ desPosition: e.target.value });
              }}
            />
          </form>
          <div className="availability">
            <div
              onClick={() => {
                this.setState({ availability: 1 });
              }}
              style={{
                backgroundColor: this.state.availability === 1 ? "red" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ availability: 2 });
              }}
              style={{
                backgroundColor:
                  this.state.availability === 2 ? "blue" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ availability: 3 });
              }}
              style={{
                backgroundColor:
                  this.state.availability === 3 ? "black" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ availability: 4 });
              }}
              style={{
                backgroundColor:
                  this.state.availability === 4 ? "green" : "white"
              }}
            />
          </div>
        </div>

        {/* right section */}
        <div>
          <form>
            <textarea name="ideal firm" value={this.state.idealFirm} />
            <textarea name="ideal role" value={this.state.idealRole} />
            <div className="allWishes">
              <div className="wishes">
                <textarea
                  name="ideal environment"
                  value={this.state.idealEnvironment}
                />
                <textarea name="ambitions" value={this.state.ambitions} />
              </div>
              <div className="skills">
                <textarea name="hardskills" value={this.state.hardSkills} />
                <textarea name="softskills" value={this.state.softSkills} />
              </div>
            </div>
          </form>
          <div className="buttons">
            <div className="cancel">X</div>
            <div className="validate" onClick={this.onClick}>
              Yes
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
