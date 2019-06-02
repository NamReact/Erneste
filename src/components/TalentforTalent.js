import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

/* Fiche qui apparait pour le Talent : il ne peut modifier que certains éléments de la description */

class TalentforTalent extends React.Component {
  state = {
    informations: null,
    description: null,
    skills: null,
    lastUpdate: null,
    isLoading: true,
    validated: null
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
      await axios.post(
        "https://ernest-server.herokuapp.com/talent/update",
        {
          id: this.state.id,
          informations: this.state.informations,
          description: this.state.description,
          skills: this.state.skills
        },
        { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
      );
    }
  };

  /* Function to render the status */

  currentStatus = () => {
    if (this.state.informations.status === String(1)) {
      return (
        <div>
          <div style={{ backgroundColor: "red" }} />
          <span>Embauché via Erneste</span>
        </div>
      );
    }
    if (this.state.informations.status === String(2)) {
      return (
        <div>
          <div style={{ backgroundColor: "blue" }} />
          <span>En recherche active</span>
        </div>
      );
    }
    if (this.state.informations.status === String(3)) {
      return (
        <div>
          <div style={{ backgroundColor: "black" }} />
          <span>Attentif au marché</span>
        </div>
      );
    }
    if (this.state.informations.status === String(4)) {
      return (
        <div>
          <div style={{ backgroundColor: "green" }} />
          <span>En poste</span>
        </div>
      );
    }
  };

  /* Function to validate the profile by the talent */

  onValidationButtonClick = e => {
    this.setState({ validated: true });
  };

  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement...</p>;
    }

    const informations = this.state.informations;
    const description = this.state.description;
    const skills = this.state.skills;

    return (
      <div className="content" onClick={this.onClick}>
        <div className="leftContainer">
          <div>
            <ReactFileReader
              fileTypes={[".png", ".jpg"]}
              base64={true}
              multipleFiles={false}
              handleFiles={this.handleFiles}
            >
              {informations.photo.length > 20 ? (
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
            <input name="First Name" readOnly value={informations.firstName} />
            <input name="Last Name" readOnly value={informations.lastName} />
            {this.currentStatus}
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

            <input name="Wage" readOnly value={informations.salary} />

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
              name="Desired sector"
              readOnly
              value={informations.wantedSector.name}
            />

            <input
              name="Size of firm"
              readOnly
              value={informations.wantedSize}
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
              name="Desired Position"
              readOnly
              value={informations.wantedTitle.name}
            />
          </form>
        </div>

        <div>
          <div
            style={{ display: this.state.validated === true ? "none" : "flex" }}
          >
            C'est votre première connexion ? Prenez le temps de lire les
            informations que nous avons synthétisées lors de notre entretien et
            validez votre profil. Si vous avez besoin d'y apporter des
            modifications, contactez-nous.
          </div>
          <h2>Fiche de poste</h2>
          <form>
            <textarea
              name="ideal firm"
              readOnly
              value={description.idealCompany}
            />

            <textarea
              name="ideal role"
              readOnly
              value={description.idealRole}
            />

            <div className="allWishes">
              <div className="wishes">
                <textarea
                  name="ideal environment"
                  readOnly
                  value={description.workingEnvironment}
                />

                <textarea
                  name="ambitions"
                  readOnly
                  value={description.development}
                />
              </div>

              <div className="skills">
                <textarea name="hardskills" readOnly value={skills.hard} />
                <textarea name="softskills" readOnly value={skills.soft} />
              </div>
            </div>
          </form>
          <button
            variant="primary"
            size="lg"
            onClick={this.onValidationButtonClick}
            style={{ display: this.state.validated === true ? "none" : "flex" }}
          >
            Valider le profil
          </button>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent" + this.props.match.params.id,
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      isLoading: false,
      informations: response.data.informations,
      description: response.data.description,
      skills: response.data.skills,
      validated: response.data.validated,
      lastUpdate: response.data.lastUpdate
    });
  }
}

export default TalentforTalent;
