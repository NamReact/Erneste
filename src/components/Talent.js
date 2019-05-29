import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

/* page admin talent : on peut tout modifier */

class Talent extends React.Component {
  state = {
    id: null,
    permission: null,
    informations: null,
    description: null,
    skills: null,
    validated: null,
    lastUpdate: null,
    isLoading: true,
    changing: null
  };

  /* Function to save picture */
  handleFiles = files => {
    const informations = { ...this.state.informations };
    informations.photo = { ...informations.photo };
    informations.photo = files.base64;
    this.setState({
      informations: informations
    });
  };

  /* Function to save changes when clicking outside the input */
  onClick = async e => {
    if (this.state.changing === null) {
      this.setState({ changing: e.target.id });
      return;
    }
    if (this.state.changing !== e.target.id) {
      this.setState({ changing: e.target.id });
      await axios.post("https://ernest-server.herokuapp.com/talent/update", {
        id: this.state.id,
        informations: this.state.informations,
        description: this.state.description,
        skills: this.state.skills
      });
      console.log("posted");
    } else {
      console.log("same");
    }
  };

  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement...</p>;
    }

    const informations = this.state.informations;
    const description = this.state.description;
    const skills = this.state.skills;
    const lastUpdate = this.state.lastUpdate;

    return (
      <div className="content" onClick={this.onClick}>
        <div className="leftContainer">
          <ReactFileReader
            fileTypes={[".png", ".jpg"]}
            base64={true}
            multipleFiles={false}
            handleFiles={this.handleFiles}
          >
            {informations.photo !== null ? (
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

          <form className="talentDetails">
            <input
              id="First Name"
              name="First Name"
              value={informations.firstName}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.firstName = { ...informations.firstName };
                informations.firstName = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />
            <input
              id="Last Name"
              name="Last Name"
              value={informations.lastName}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.lastName = { ...informations.lastName };
                informations.lastName = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />
            <input
              id="LinkedIn Profil"
              name="LinkedIn Profil"
              value={informations.linkedIn}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.linkedIn = { ...informations.linkedIn };
                informations.linkedIn = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />

            <input
              id="email"
              name="email"
              value={informations.email}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.email = { ...informations.email };
                informations.email = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />

            <input
              id="phone number"
              name="phone number"
              value={informations.phoneNumber}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.phoneNumber = { ...informations.phoneNumber };
                informations.phoneNumber = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />

            <input
              id="Wage"
              name="Wage"
              value={informations.salary}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.salary = { ...informations.salary };
                informations.salary = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />

            <input
              id="Current company"
              name="Current company"
              value={informations.actualCompany}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.actualCompany = { ...informations.actualCompany };
                informations.actualCompany = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />

            <input
              id="Desired sector"
              name="Desired sector"
              value={informations.wantedSector}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.wantedSector = { ...informations.wantedSector };
                informations.wantedSector = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />

            <input
              id="Current position"
              name="Current position"
              value={informations.actualTitle}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.actualTitle = { ...informations.actualTitle };
                informations.actualTitle = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />

            <input
              id="Desired Position"
              name="Desired Position"
              value={informations.wantedTitle}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.wantedTitle = { ...informations.wantedTitle };
                informations.wantedTitle = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />
          </form>
          <div className="availability">
            <div
              onClick={() => {
                this.setState({ availability: 1 });
              }}
              style={{
                backgroundColor: informations.status === "1" ? "red" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ availability: 2 });
              }}
              style={{
                backgroundColor: informations.status === "2" ? "blue" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ availability: 3 });
              }}
              style={{
                backgroundColor: informations.status === "3" ? "black" : "white"
              }}
            />
            <div
              onClick={() => {
                this.setState({ availability: 4 });
              }}
              style={{
                backgroundColor: informations.status === "4" ? "green" : "white"
              }}
            />
          </div>
          <div>
            <div>Client 1</div> {/* link to clients attibuted to talent */}
            <div>Client 2</div>
            <div>Client 3</div>
            <div>Client 4</div>
          </div>

          <div>{lastUpdate}</div>
        </div>

        <div>
          <form>
            <textarea
              id="ideal firm"
              name="ideal firm"
              value={description.idealCompany}
              onChange={e => {
                const description = { ...this.state.description };
                description.idealCompany = { ...description.idealCompany };
                description.idealCompany = e.target.value;
                this.setState({
                  description: description
                });
              }}
            />

            <textarea
              id="ideal role"
              name="ideal role"
              value={description.idealRole}
              onChange={e => {
                const description = { ...this.state.description };
                description.idealRole = { ...description.idealRole };
                description.idealRole = e.target.value;
                this.setState({
                  description: description
                });
              }}
            />

            <div className="allWishes">
              <div className="wishes">
                <textarea
                  id="ideal environment"
                  name="ideal environment"
                  value={description.workingEnvironment}
                  onChange={e => {
                    const description = { ...this.state.description };
                    description.workingEnvironment = {
                      ...description.workingEnvironment
                    };
                    description.workingEnvironment = e.target.value;
                    this.setState({
                      description: description
                    });
                  }}
                />

                <textarea
                  id="ambitions"
                  name="ambitions"
                  value={description.development}
                  onChange={e => {
                    const description = { ...this.state.description };
                    description.development = { ...description.development };
                    description.development = e.target.value;
                    this.setState({
                      description: description
                    });
                  }}
                />
              </div>

              <div className="skills">
                <textarea
                  name="hardskills"
                  value={skills.hard.join(" ")}
                  onChange={e => {
                    this.setState({ hardSkills: e.target.value });
                  }}
                />
                <textarea
                  name="softskills"
                  value={skills.soft.join(" ")}
                  onChange={e => {
                    this.setState({ softSkills: e.target.value });
                  }}
                />
              </div>
            </div>
          </form>
          {/* <div className="buttons">
            <div className="cancel">X</div>
            <div className="validate" onClick={this.onClick}>
              Yes
            </div>
          </div> */}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/" + this.props.match.params.id
    );

    this.setState({
      isLoading: false,
      id: this.props.match.params.id,
      /* permission: response.data.permission, */
      informations: response.data.informations,
      description: response.data.description,
      skills: response.data.skills,
      validated: response.data.validated,
      lastUpdate: response.data.lastUpdate
    });
  }
}

export default Talent;
