import React from "react";
import axios from "axios";

class Talent extends React.Component {
  state = {
    permission: null,
    informations: null,
    description: null,
    skills: null,
    validated: null,
    lastUpdate: null,
    isLoading: true
  };
  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement...</p>;
    }

    /* const permission = this.state.permission; */
    const informations = this.state.informations;
    const description = this.state.description;
    const skills = this.state.skills;
    const lastUpdate = this.state.lastUpdate;

    return (
      <div className="content">
        <div className="leftContainer">
          <div>
            {this.state.picture !== null ? (
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
          </div>

          <form className="talentDetails">
            <input
              name="First Name"
              value={informations.firstName}
              /*   placeholder="Prénom"
              onChange={e => {
                this.setState({ firstName: e.target.value });
              }} */
            />
            <input
              name="Last Name"
              value={informations.lastName}
              /* placeholder="NOM"
              onChange={e => {
                this.setState({ lastName: e.target.value });
              }} */
            />
            <input
              name="LinkedIn Profil"
              value={informations.linkedIn}
              /* placeholder="Profil LinkedIn"
              onChange={e => {
                this.setState({ linkedIn: e.target.value });
              }} */
            />
            <input
              name="email"
              value={informations.email}
              placeholder="adresse@email.com"
              /*       onChange={e => {
                this.setState({ informations.email: e.target.value });
                axios
                .post("https://ernest-server.herokuapp.com/talent/update", {id:_id, 
                  informations: {email: this.state.informations.email}
               
              }} */
            />
            <input
              name="phone number"
              value={informations.phoneNumber}
              /* placeholder="0XXXXXXX"
              onChange={e => {
                this.setState({ phone: e.target.value });
              }} */
            />
            <input
              name="Wage"
              value={informations.salary}
              /* placeholder="$$$$$$$$"
              onChange={e => {
                this.setState({ wage: e.target.value });
              }} */
            />
            <input
              name="Current company"
              value={informations.actualCompany}
              /* placeholder="Entreprise actuelle"
              onChange={e => {
                this.setState({ curCompany: e.target.value });
              }} */
            />
            <input
              name="Desired sector"
              value={informations.mobility}
              /* placeholder="Secteur Souhaité"
              onChange={e => {
                this.setState({ sector: e.target.value });
              }} */
            />
            <input
              name="Current position"
              value={informations.actualTitle}
              /* placeholder="Fonction actuelle"
              onChange={e => {
                this.setState({ curPosition: e.target.value });
              }} */
            />
            <input
              name="Desired Position"
              value={informations.wantedTitle}
              /* placeholder="Position souhaitée"
              onChange={e => {
                this.setState({ desPosition: e.target.value });
              }} */
            />
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
            <textarea
              name="ideal firm"
              value={description.idealCompany}
              /* onChange={e => {
                this.setState({ idealFirm: e.target.value });
              }} */
            />
            <textarea
              name="ideal role"
              value={description.idealRole}
              /* onChange={e => {
                this.setState({ idealRole: e.target.value });
              }} */
            />
            <div className="allWishes">
              <div className="wishes">
                <textarea
                  name="ideal environment"
                  value={description.workingEnvironment}
                  /* onChange={e => {
                    this.setState({ idealEnvironment: e.target.value });
                  }} */
                />
                <textarea
                  name="ambitions"
                  value={description.development}
                  /* onChange={e => {
                    this.setState({ ambitions: e.target.value });
                  }} */
                />
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

export default Talent;
