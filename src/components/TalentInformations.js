import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

class TalentInformations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayOfTitles: [],
      arrayOfSectors: [],
      sectorSelect: false,
      sizeSelect: false,
      titleSelect: false,
      statusSelect: false
    };
  }

  /* Interrupters for drop lists */

  sectorSelect = () => {
    this.setState({ sectorSelect: !this.state.sectorSelect });
  };

  sizeSelect = () => {
    this.setState({ sizeSelect: !this.state.sizeSelect });
  };

  titleSelect = () => {
    this.setState({ titleSelect: !this.state.titleSelect });
  };

  statusSelect = () => {
    this.setState({ statusSelect: !this.state.statusSelect });
  };

  /* Functions for setState */

  handleFiles = files => {
    this.props.setPhoto(files.base64);
  };

  handleWantedTitle = e => {
    const title = this.props.informations.wantedTitle;
    for (let i = 0; i < this.state.arrayOfTitles.length; i++) {
      if (e.target.id === this.state.arrayOfTitles[i]._id) {
        title.push(this.state.arrayOfTitles[i]);
        break;
      }
    }
    this.props.setTitle(title);
    this.setState({ titleSelect: false });
  };

  /* Function to handle company size */

  handleSize = e => {
    this.props.setSize(e.target.id);
    this.setState({ sizeSelect: false });
  };

  /* Function to set availability */

  handleAvailability = e => {
    this.props.setStatus(e.target.id);
    this.setState({ statusSelect: false });
  };

  handleWantedSector = e => {
    const sector = this.props.informations.wantedSector;
    for (let i = 0; i < this.state.arrayOfSectors.length; i++) {
      if (e.target.id === this.state.arrayOfSectors[i]._id) {
        sector.push(this.state.arrayOfSectors[i]);
        break;
      }
    }
    this.props.setSector(sector);
    this.setState({ sectorSelect: false });
  };

  render() {
    const informations = this.props.informations;
    const lastUpdate = this.props.lastUpdate;
    let errorFirstName = false;
    let errorLastName = false;
    let errorEmail = false;

    if (this.props.error) {
      errorFirstName = this.props.error.firstName;
      errorLastName = this.props.error.lastName;
      errorEmail = this.props.error.email;
    }

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
    if (informations.status === "Ne pas être contacter") {
      dotColor = "#FF9D9D";
    }
    if (informations.status === "Embauché(e) par Erneste") {
      dotColor = "#6A6A8F";
    }
    return (
      <div className="leftContainer">
        <ReactFileReader
          fileTypes={[".png", ".jpg"]}
          base64={true}
          multipleFiles={false}
          handleFiles={this.handleFiles}
        >
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
              <div className="text-empty-picture">
                Cliquez pour ajouter une photo
              </div>
            </div>
          )}
        </ReactFileReader>

        <div className="talentDetails">
          <div>Prénom</div>
          <input
            id="firstName"
            placeholder={
              errorFirstName === true ? "Champs obligatoire" : "Prénom"
            }
            name="First Name"
            className={
              errorFirstName === true ? "talentInformations-error" : null
            }
            value={informations.firstName}
            onChange={e => this.props.setInformations(e)}
          />
          <div>Nom</div>
          <input
            id="lastName"
            placeholder={errorLastName === true ? "Champs obligatoire" : "Nom"}
            name="Last Name"
            className={
              errorLastName === true ? "talentInformations-error" : null
            }
            value={informations.lastName}
            onChange={e => this.props.setInformations(e)}
          />

          <div>Profil LinkedIn</div>
          <input
            id="linkedIn"
            placeholder="Mon LinkedIn"
            name="LinkedIn Profil"
            value={informations.linkedIn}
            onChange={e => this.props.setInformations(e)}
          />
          <div>Email</div>
          <input
            id="email"
            placeholder={errorEmail === true ? "Champs obligatoire" : "Email"}
            name="email"
            className={errorEmail === true ? "talentInformations-error" : null}
            value={informations.email}
            onChange={e => this.props.setInformations(e)}
          />
          <div>Téléphone</div>
          <input
            id="phoneNumber"
            placeholder="XX XX XX XX XX"
            name="phone number"
            value={informations.phoneNumber}
            onChange={e => this.props.setInformations(e)}
          />
          <div>Salaire</div>
          <input
            id="salary"
            placeholder="Salaire"
            name="Wage"
            value={informations.salary}
            onChange={e => this.props.setInformations(e)}
          />
          <div>Entreprise actuelle</div>
          <input
            id="actualCompany"
            placeholder="Entreprise actuelle"
            name="Current company"
            value={informations.actualCompany}
            onChange={e => this.props.setInformations(e)}
          />

          <div>Secteur souhaité</div>
          <div>
            {informations.wantedSector.map((item, index) => {
              return (
                <div className="displayed-array" key={index}>
                  {item.name}
                  <div
                    id={index}
                    className="displayed-array-delete"
                    onClick={e => this.props.deleteSector(e.target.id)}
                  >
                    X
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative-container">
            <div
              className="select-container"
              style={{
                borderColor: this.state.sectorSelect && "#333266",
                color: this.state.sectorSelect && "#333266"
              }}
              onClick={this.sectorSelect}
            >
              <div>Ajouter un secteur</div>
              {this.state.sectorSelect === false ? (
                <div className="talentInformations-open-arrow">
                  <i class="fas fa-sort-down" />
                </div>
              ) : (
                <div className="talentInformations-close-arrow">
                  <i class="fas fa-sort-down" />
                </div>
              )}
            </div>
            {this.state.sectorSelect && (
              <div className="sector-list">
                {this.state.arrayOfSectors.map((sector, index) => {
                  return (
                    <div
                      id={sector._id}
                      key={index}
                      onClick={this.handleWantedSector}
                      className="tag-option"
                    >
                      {sector.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>Taille d'entreprise souhaitée</div>

          <div className="relative-container">
            <div
              className="select-container"
              style={{
                borderColor: this.state.sizeSelect && "#333266",
                color: this.state.sizeSelect && "#333266"
              }}
              onClick={this.sizeSelect}
            >
              {informations.wantedSize ? (
                <div style={{ color: "#333266" }}>
                  {informations.wantedSize}
                </div>
              ) : (
                <div>Choisir une taille</div>
              )}
              {this.state.sizeSelect === false ? (
                <div className="talentInformations-open-arrow">
                  <i class="fas fa-sort-down" />
                </div>
              ) : (
                <div className="talentInformations-close-arrow">
                  <i class="fas fa-sort-down" />
                </div>
              )}
            </div>
            {this.state.sizeSelect && (
              <div className="size-list">
                <div
                  id="Petite"
                  onClick={this.handleSize}
                  className="tag-option"
                >
                  Petite
                </div>
                <div
                  id="Grande"
                  onClick={this.handleSize}
                  className="tag-option"
                >
                  Grande
                </div>
                <div
                  id="Indifférent"
                  onClick={this.handleSize}
                  className="tag-option"
                >
                  Indifférent
                </div>
              </div>
            )}
          </div>

          <div>Fonction actuelle</div>
          <input
            id="actualTitle"
            placeholder="Fonction actuelle"
            name="Current position"
            value={informations.actualTitle}
            onChange={e => this.props.setInformations(e)}
          />

          <div>Fonction souhaitée</div>
          <div>
            {informations.wantedTitle.map((item, index) => {
              return (
                <div className="displayed-array" key={index}>
                  {item.name}
                  <div
                    id={index}
                    className="displayed-array-delete"
                    onClick={e => this.props.deleteTitle(e.target.id)}
                  >
                    X
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative-container">
            <div
              className="select-container"
              style={{
                borderColor: this.state.titleSelect && "#333266",
                color: this.state.titleSelect && "#333266"
              }}
              onClick={this.titleSelect}
            >
              <div>Ajouter une fonction</div>
              {this.state.titleSelect === false ? (
                <div className="talentInformations-open-arrow">
                  <i class="fas fa-sort-down" />
                </div>
              ) : (
                <div className="talentInformations-close-arrow">
                  <i class="fas fa-sort-down" />
                </div>
              )}
            </div>
            {this.state.titleSelect && (
              <div className="sector-list">
                {this.state.arrayOfTitles.map((title, index) => {
                  return (
                    <div
                      id={title._id}
                      key={index}
                      onClick={this.handleWantedTitle}
                      className="tag-option"
                    >
                      {title.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div>Statut</div>

        <div className="relative-container">
          <div
            className="select-container"
            style={{
              borderColor: this.state.statusSelect && "#333266",
              color: this.state.statusSelect && "#333266"
            }}
            onClick={this.statusSelect}
          >
            <div className="availability-dot">
              <div
                style={{
                  backgroundColor: dotColor,
                  borderWidth: informations.status ? "none" : "1px",
                  borderStyle: informations.status ? "none" : "solid"
                }}
              />
            </div>
            {informations.status ? (
              <div style={{ color: "#333266" }}>{informations.status}</div>
            ) : (
              <div>Modifier le statut</div>
            )}

            {this.state.statusSelect === false ? (
              <div className="talentInformations-open-arrow">
                <i class="fas fa-sort-down" />
              </div>
            ) : (
              <div className="talentInformations-close-arrow">
                <i class="fas fa-sort-down" />
              </div>
            )}
          </div>
          {this.state.statusSelect && (
            <div className="sector-list">
              <div
                id="Recherche active"
                className="tag-option"
                onClick={this.handleAvailability}
              >
                Recherche active
              </div>
              <div
                id="Ouvert(e) aux opportunités"
                className="tag-option"
                onClick={this.handleAvailability}
              >
                Ouvert(e) aux opportunités
              </div>
              <div
                id="Ne pas être contacter"
                className="tag-option"
                onClick={this.handleAvailability}
              >
                Ne pas être contacter
              </div>
              <div
                id="Embauché(e) par Erneste"
                className="tag-option"
                onClick={this.handleAvailability}
              >
                Embauché(e) par Erneste
              </div>
            </div>
          )}
        </div>
        {this.props.button && (
          <div className="buttons button-update-talent">
            <div
              onClick={this.props.setUpdate}
              className="cancel button-update-talent"
            >
              Annuler
            </div>
            <div
              onClick={this.props.update}
              className="validate button-update-talent"
            >
              Mettre à jour
            </div>
          </div>
        )}
        {lastUpdate && <div>{"Modifé le " + formatUpdate}</div>}
      </div>
    );
  }

  async componentDidMount() {
    const response1 = await axios.get(
      "https://ernest-server.herokuapp.com/sector",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    const response2 = await axios.get(
      "https://ernest-server.herokuapp.com/title",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      arrayOfSectors: response1.data,
      arrayOfTitles: response2.data
    });
  }
}

export default TalentInformations;
