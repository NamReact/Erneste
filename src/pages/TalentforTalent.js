import React from "react";
import axios from "axios";
import TalentInformations from "../components/TalentInformations";
import TalentInfoDisplay from "../components/TalentInfoDisplay";
import TalentDescription from "../components/TalentDescription";

/* Fiche qui apparait pour le Talent : il ne peut modifier que certains éléments de la description */

class TalentforTalent extends React.Component {
  state = {
    informations: {
      photo: null,
      firstName: "",
      lastName: "",
      linkedIn: "",
      email: "",
      phoneNumber: "",
      salary: "",
      actualCompany: "",
      wantedSector: [],
      wantedSize: "",
      actualTitle: "",
      wantedTitle: [],
      status: ""
    },
    description: {
      idealCompany: "",
      idealRole: "",
      workingEnvironment: "",
      development: ""
    },
    skills: null,
    validated: false,
    lastUpdate: null,
    isUpdating: false
  };

  /* ** INTERRUPTERS ** */
  setUpdate = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  setInformations = e => {
    const key = e.target.id;
    const informations = this.state.informations;
    informations[key] = e.target.value;
    this.setState({ informations });
  };

  setPhoto = photo => {
    const informations = this.state.informations;
    informations.photo = photo;
    this.setState({ informations });
  };

  setTitle = title => {
    const informations = this.state.informations;
    informations.title = title;
    this.setState({ informations });
  };

  deleteTitle = i => {
    const informations = this.state.informations;
    informations.wantedTitle.splice(i, 1);
    this.setState({ informations });
  };

  setSize = wantedSize => {
    const informations = this.state.informations;
    informations.wantedSize = wantedSize;
    this.setState({ informations });
  };

  setStatus = status => {
    const informations = this.state.informations;
    informations.status = status;
    this.setState({ informations });
  };

  setSector = sector => {
    const informations = this.state.informations;
    informations.sector = sector;
    this.setState({ informations });
  };

  deleteSector = i => {
    const informations = this.state.informations;
    informations.wantedSector.splice(i, 1);
    this.setState({ informations });
  };

  update = async () => {
    await axios.post(
      "https://ernest-server.herokuapp.com/talent/update",
      {
        id: this.props.match.params.id,
        informations: this.state.informations
      },
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({ isUpdating: false });
    return;
  };

  onProfilValidation = async () => {
    await this.setState({ validated: true });
    await axios.post(
      "https://ernest-server.herokuapp.com/talent/update",
      {
        id: this.props.match.params.id,
        validated: this.state.validated
      },
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    return;
  };

  render() {
    return (
      <div>
        <div className="content">
          {false && this.state.validated}
          <div className="body-container">
            {this.state.isUpdating ? (
              <TalentInformations
                button={true}
                update={this.update}
                setUpdate={this.setUpdate}
                lastUpdate={this.state.lastUpdate}
                informations={this.state.informations}
                setInformations={this.setInformations}
                lastUpdate={this.state.lastUpdate}
                setPhoto={this.setPhoto}
                setTitle={this.setTitle}
                deleteTitle={this.deleteTitle}
                setSize={this.setSize}
                setStatus={this.setStatus}
                setSector={this.setSector}
                deleteSector={this.deleteSector}
              />
            ) : (
              <TalentInfoDisplay
                setUpdate={this.setUpdate}
                informations={this.state.informations}
                lastUpdate={this.state.lastUpdate}
                setUpdate={this.setUpdate}
                isUpdating={this.state.isUpdating}
              />
            )}
            <div
              className={
                this.state.validated
                  ? "right-container"
                  : "right-container-to-validate"
              }
            >
              <div
                className="text-validation"
                style={{ display: this.state.validated ? "none" : "display" }}
              >
                C'est votre première connexion ? Prenez le temps de lire les
                informations que nous avons synthétisées de notre entretien et
                de valider votre profil. Si vous avez besoin d'y apporter des
                modifications, contactez-nous.
              </div>
              <TalentDescription
                description={this.state.description}
                skills={this.state.skills}
              />
              <div
                className="validate-profil"
                onClick={this.onProfilValidation}
                style={{ display: this.state.validated ? "none" : "display" }}
              >
                Valider le profil
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    this.props.setPageActive("talent");
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/" +
        this.props.match.params.id,
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      informations: response.data.informations,
      description: response.data.description,
      skills: response.data.skills,
      validated: response.data.validated,
      lastUpdate: response.data.lastUpdate
    });
  }
}

export default TalentforTalent;
