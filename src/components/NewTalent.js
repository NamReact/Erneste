import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

import "./newTalent.css";

/* page creation nouveau talent */

class NewTalent extends React.Component {
  state = {
    informations: {
      photo: null,
      firstName: "hihihih",
      lastName: "gygygy",
      linkedIn: "plplpl",
      email: "popopo",
      phoneNumber: "ioioioi",
      salary: "ppppp",
      actualCompany: "kokoko",
      wantedSector: "uououo",
      actualTitle: "pjpjpj",
      wantedTitle: "kklklk",
      status: "1"
    },
    description: {
      idealCompany: "jhjhj",
      idealRole: "uuuuu",
      workingEnvironment: "ooooo",
      development: "ppppp"
    },
    skills: []
  };

  onClick = () => {
    const hardSkillsArray = this.state.hardSkills.split(" ");
    const softSkillsArray = this.state.softSkills.split(" ");

    axios
      .post("https://ernest-server.herokuapp.com/talent/create", {
        informations: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          photo: this.state.photo,
          phoneNumber: this.state.phoneNumber,
          salary: this.state.salary,
          actualCompany: this.state.actualCompany,
          wantedSector: this.state.wantedSector,
          actualTitle: this.state.actualPosition,
          wantedTitle: this.state.wantedPosition,
          status: this.state.status
        },
        description: {
          idealCompany: this.state.idealCompany,
          idealRole: this.state.idealRole,
          workingEnvironment: this.state.workingEnvironment,
          development: this.state.development
        },
        skills: {
          soft: softSkillsArray,
          hard: hardSkillsArray
        }
      })
      .then(response => {
        console.log("before");
        /*   this.props.getId(response.data._id); */
        console.log("ok");
        /* return <Redirect to={`/talent/${response.data._id}`} />; */
      });
  };

  handleFiles = files => {
    this.setState({
      photo: files.base64
    });
  };

  render() {
    const informations = this.state.informations;
    const description = this.state.description;
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
              {this.state.photo !== null ? (
                <span>
                  <img
                    src={informations.photo}
                    alt="portrait of talent"
                    className="talentPicture"
                  />
                </span>
              ) : (
                <div
                  style={{
                    height: "100px",
                    width: "75px",
                    backgroundColor: "grey"
                  }}
                />
              )}
            </ReactFileReader>
          </div>

          <form className="talentDetails">
            <input
              name="First Name"
              value={informations.firstName}
              placeholder="Prénom"
              onChange={e => {
                this.setState({ firstName: e.target.value });
              }}
            />
            <input
              name="Last Name"
              value={informations.lastName}
              placeholder="NOM"
              onChange={e => {
                this.setState({ lastName: e.target.value });
              }}
            />
            <input
              name="LinkedIn Profil"
              value={informations.linkedIn}
              placeholder="Profil LinkedIn"
              onChange={e => {
                this.setState({ linkedIn: e.target.value });
              }}
            />
            <input
              name="email"
              value={informations.email}
              placeholder="adresse@email.com"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <input
              name="phone number"
              value={informations.phoneNumber}
              placeholder="0XXXXXXX"
              onChange={e => {
                this.setState({ phoneNumber: e.target.value });
              }}
            />
            <input
              name="Wage"
              value={informations.salary}
              placeholder="$$$$$$$$"
              onChange={e => {
                this.setState({ salary: e.target.value });
              }}
            />
            <input
              name="Current company"
              value={informations.actualCompany}
              placeholder="Entreprise actuelle"
              onChange={e => {
                this.setState({ actualCompany: e.target.value });
              }}
            />
            <input
              name="Desired sector"
              value={informations.wantedSector}
              placeholder="Secteur Souhaité"
              onChange={e => {
                this.setState({ wantedSector: e.target.value });
              }}
            />
            <input
              name="Current position"
              value={informations.actualTitle}
              placeholder="Fonction actuelle"
              onChange={e => {
                this.setState({ actualTitle: e.target.value });
              }}
            />
            <input
              name="Desired Position"
              value={informations.wantedTitle}
              placeholder="Position souhaitée"
              onChange={e => {
                this.setState({ wantedTitle: e.target.value });
              }}
            />
          </form>
          <div className="availability">
            <div
              onClick={() => {
                this.setState({ status: 1 });
              }}
              style={{
                backgroundColor: informations.status === 1 ? "red" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ status: 2 });
              }}
              style={{
                backgroundColor: informations.status === 2 ? "blue" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ status: 3 });
              }}
              style={{
                backgroundColor: informations.status === 3 ? "black" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ status: 4 });
              }}
              style={{
                backgroundColor: informations.status === 4 ? "green" : "white"
              }}
            />
          </div>
        </div>

        {/* right section */}
        <div>
          <form>
            <textarea
              name="ideal firm"
              value={description.idealCompany}
              onChange={e => {
                this.setState({ idealCompany: e.target.value });
              }}
            />
            <textarea
              name="ideal role"
              value={description.idealRole}
              onChange={e => {
                this.setState({ idealRole: e.target.value });
              }}
            />
            <div className="allWishes">
              <div className="wishes">
                <textarea
                  name="ideal environment"
                  value={description.workingEnvironment}
                  onChange={e => {
                    this.setState({ workingEnvironment: e.target.value });
                  }}
                />
                <textarea
                  name="ambitions"
                  value={description.development}
                  onChange={e => {
                    this.setState({ development: e.target.value });
                  }}
                />
              </div>
              {/*    <div className="skills">
                <textarea
                  name="hardskills"
                  value={description.hardSkills}
                  onChange={e => {
                    this.setState({ hardSkills: e.target.value });
                  }}
                />
                <textarea
                  name="softskills"
                  value={description.softSkills}
                  onChange={e => {
                    this.setState({ softSkills: e.target.value });
                  }}
                />
              </div> */}
            </div>
          </form>
          <div className="buttons">
            <div className="cancel">X</div>
            {/* lien à faire vers liste des talents */}
            <div className="validate" onClick={this.onClick}>
              {/* lien à faire vers page talent validée */}
              Yes
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewTalent;
