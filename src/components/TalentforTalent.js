import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

class TalentforTalent extends React.Component {
  /* Fiche qui apparait pour le Talent : il ne peut modifier que certains éléments de la description */
  state = {
    /*  permission: null, */
    informations: null,
    /*  description: null,
    skills: null,
   
    lastUpdate: null, */
    isLoading: true,
    validated: null
  };

  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement...</p>;
    }

    /* const permission = this.state.permission; */
    const informations = this.state.informations;
    /* const description = this.state.description;
    const skills = this.state.skills; */
    const lastUpdate = this.state.lastUpdate;

    return (
      <div className="content">
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
                  <img
                    src={this.state.picture}
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
            <input name="First Name" value={informations.firstName} />
            <input name="Last Name" value={informations.lastName} />
            <input
              name="LinkedIn Profil"
              value={informations.linkedIn}
              onChange={async e => {
                await this.setState({
                  informations: { linkedIn: e.target.value }
                });
                axios.post(
                  "https://ernest-server.herokuapp.com/talent/update",
                  {
                    id: this.props.match.params.id,
                    informations: { linkedIn: this.state.informations.linkedIn }
                  }
                );
              }}
            />

            <input
              name="email"
              value={informations.email}
              onChange={async e => {
                await this.setState({
                  informations: { email: e.target.value }
                });

                axios.post(
                  "https://ernest-server.herokuapp.com/talent/update",
                  {
                    id: this.props.match.params.id,
                    informations: { email: this.state.informations.email }
                  }
                );
              }}
            />

            <input
              name="phone number"
              value={informations.phoneNumber}
              onChange={async e => {
                await this.setState({
                  informations: { phoneNumber: e.target.value }
                });
                axios.post(
                  "https://ernest-server.herokuapp.com/talent/update",
                  {
                    id: this.props.match.params.id,
                    informations: {
                      phoneNumber: this.state.informations.phoneNumber
                    }
                  }
                );
              }}
            />

            <input name="Wage" value={informations.salary} />

            <input
              name="Current company"
              value={informations.actualCompany}
              onChange={async e => {
                await this.setState({
                  informations: { actualCompany: e.target.value }
                });
                axios.post(
                  "https://ernest-server.herokuapp.com/talent/update",
                  {
                    id: this.props.match.params.id,
                    informations: {
                      lastName: this.state.informations.actualCompany
                    }
                  }
                );
              }}
            />

            <input name="Desired sector" value={informations.wantedSector} />

            <input
              name="Current position"
              value={informations.actualTitle}
              onChange={async e => {
                await this.setState({
                  informations: { actualTitle: e.target.value }
                });
                axios.post(
                  "https://ernest-server.herokuapp.com/talent/update",
                  {
                    id: this.props.match.params.id,
                    informations: {
                      actualTitle: this.state.informations.actualTitle
                    }
                  }
                );
              }}
            />

            <input name="Desired Position" value={informations.wantedTitle} />
          </form>
          <div className="availability">
            <div
              /*  onClick={() => {
                this.setState({ availability: 1 });
              }} */
              style={{
                backgroundColor: informations.status === "1" ? "red" : "white"
              }}
            />
            <div
              /* onClick={() => {
                this.setState({ availability: 2 });
              }} */
              style={{
                backgroundColor: informations.status === "2" ? "blue" : "white"
              }}
            />
            <div
              /* onClick={() => {
                this.setState({ availability: 3 });
              }} */
              style={{
                backgroundColor: informations.status === "3" ? "black" : "white"
              }}
            />
            <div
              /* onClick={() => {
                this.setState({ availability: 4 });
              }} */
              style={{
                backgroundColor: informations.status === "4" ? "green" : "white"
              }}
            />
          </div>
          <div>
            <div>Client 1</div>
            <div>Client 2</div>
            <div>Client 3</div>
            <div>Client 4</div>
          </div>

          <div>{lastUpdate}</div>
        </div>

        <div>
          <form>
            <textarea name="ideal firm" value={description.idealCompany} />

            <textarea name="ideal role" value={description.idealRole} />

            <div className="allWishes">
              <div className="wishes">
                <textarea
                  name="ideal environment"
                  value={description.workingEnvironment}
                />

                <textarea name="ambitions" value={description.development} />
              </div>

              <div className="skills">
                <textarea
                  name="hardskills"
                  value={skills.hard}
                  /* onChange={e => {
                    this.setState({ hardSkills: e.target.value });
                  }} */
                />
                <textarea
                  name="softskills"
                  value={skills.soft}
                  /* onChange={e => {
                    this.setState({ softSkills: e.target.value });
                  }} */
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
      /* permission: response.data.permission, */
      informations: response.data.informations,
      description: response.data.description,
      skills: response.data.skills,
      validated: response.data.validated,
      lastUpdate: response.data.lastUpdate
    });
  }
}

export default TalentforTalent;
