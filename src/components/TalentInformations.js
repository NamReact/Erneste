import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

class TalentInformations extends React.Component {
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
    arrayOfTitles: [],
    arrayOfSectors: [],
    sectorSelect: false,
    sizeSelect: false,
    titleSelect: false,
    statusSelect: false,
    lastUpdate: null
  };

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

  handleFiles = files => {
    const informations = { ...this.state.informations };
    informations.photo = { ...informations.photo };
    informations.photo = files.base64;
    this.setState({
      informations: informations
    });
  };

  handleWantedTitle = e => {
    const informationsCopy = this.state.informations;
    informationsCopy.wantedTitle = [...this.state.informations.wantedTitle];
    for (let i = 0; i < this.state.arrayOfTitles.length; i++) {
      if (e.target.id === this.state.arrayOfTitles[i]._id) {
        informationsCopy.wantedTitle.push(this.state.arrayOfTitles[i]);
      }
    }
    this.setState({ informations: informationsCopy, titleSelect: false });
  };

  /* Function to handle company size */

  handleSize = e => {
    const informations = this.state.informations;
    informations.wantedSize = e.target.id;
    this.setState({ informations, sizeSelect: false });
  };

  /* Function to set availability */

  handleAvailability = e => {
    const informations = this.state.informations;
    informations.status = e.target.id;
    this.setState({ informations, statusSelect: false });
  };

  handleWantedSector = e => {
    const informationsCopy = this.state.informations;
    informationsCopy.wantedSector = [...this.state.informations.wantedSector];
    for (let i = 0; i < this.state.arrayOfSectors.length; i++) {
      if (e.target.id === this.state.arrayOfSectors[i]._id) {
        informationsCopy.wantedSector.push(this.state.arrayOfSectors[i]);
      }
    }
    this.setState({ informations: informationsCopy, sectorSelect: false });
  };

  post = async () => {
    try {
      await axios.post(
        "https://ernest-server.herokuapp.com/talent/update",
        {
          id: this.props.id,
          informations: this.state.informations
        },
        { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
      );
      this.props.setUpdate();
    } catch (error) {
      console.log(error.message);
    }
  };

  onSave = async () => {
    await this.post();
    this.props.setUpdate();
    this.props.stopSave();
  };

  onCreate = () => {
    this.props.getInformations(this.state.informations);
  };

  render() {
    if (this.props.save === true) {
      if (this.props.action === "update") {
        this.onSave();
      } else {
        this.onCreate();
      }
    }
    const informations = this.state.informations;
    const lastUpdate = this.state.lastUpdate;
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

        <form className="talentDetails">
          <div>Prénom</div>
          <input
            placeholder="Prénom"
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
          <div>Nom</div>
          <input
            placeholder="Nom"
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

          <div>Profil LinkedIn</div>
          <input
            placeholder="Mon LinkedIn"
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
          <div>Email</div>
          <input
            placeholder="Email"
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
          <div>Téléphone</div>
          <input
            placeholder="XX XX XX XX XX"
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
          <div>Salaire</div>
          <input
            placeholder="Salaire"
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
          <div>Entreprise actuelle</div>
          <input
            placeholder="Entreprise actuelle"
            name="Current company"
            value={informations.actualCompany}
            onChange={e => {
              const informations = { ...this.state.informations };
              informations.actualCompany = {
                ...informations.actualCompany
              };
              informations.actualCompany = e.target.value;
              this.setState({
                informations: informations
              });
            }}
          />

          <div>Secteur souhaité</div>
          <div>
            {this.state.informations.wantedSector.map((item, index) => {
              return (
                <div className="displayed-array" key={index}>
                  {item.name}
                  <div
                    id={index}
                    className="displayed-array-delete"
                    onClick={e => {
                      const id = e.target.id;
                      const informations = { ...this.state.informations };
                      informations.wantedSector = [
                        ...informations.wantedSector
                      ];

                      informations.wantedSector.splice(id, 1);
                      this.setState({ informations });
                    }}
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
                <div>{">"}</div>
              ) : (
                <div>{"<"}</div>
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
              {this.state.informations.wantedSize ? (
                <div style={{ color: "#333266" }}>
                  {this.state.informations.wantedSize}
                </div>
              ) : (
                <div>Choisir une taille</div>
              )}
              {this.state.sizeSelect === false ? (
                <div>{">"}</div>
              ) : (
                <div>{"<"}</div>
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
              </div>
            )}
          </div>

          <div>Fonction actuelle</div>
          <input
            placeholder="Fonction actuelle"
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

          <div>Fonction souhaitée</div>
          <div>
            {this.state.informations.wantedTitle.map((item, index) => {
              return (
                <div className="displayed-array" key={index}>
                  {item.name}
                  <div
                    id={index}
                    className="displayed-array-delete"
                    onClick={e => {
                      const id = e.target.id;
                      const informations = { ...this.state.informations };
                      informations.wantedTitle = [...informations.wantedTitle];
                      informations.wantedTitle.splice(id, 1);
                      this.setState({ informations });
                    }}
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
                <div>{">"}</div>
              ) : (
                <div>{"<"}</div>
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
        </form>

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
                  borderWidth: this.state.informations.status ? "none" : "1px",
                  borderStyle: this.state.informations.status ? "none" : "solid"
                }}
              />
            </div>
            {this.state.informations.status ? (
              <div style={{ color: "#333266" }}>
                {this.state.informations.status}
              </div>
            ) : (
              <div>Modifier le statut</div>
            )}

            {this.state.statusSelect === false ? (
              <div>{">"}</div>
            ) : (
              <div>{"<"}</div>
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
            <div onClick={this.post} className="validate button-update-talent">
              Mettre à jour
            </div>
          </div>
        )}
        {this.state.lastUpdate && (
          <div>{"Modifé le " + lastUpdate.split(",").shift()}</div>
        )}
      </div>
    );
  }

  async componentDidMount() {
    if (this.props.id) {
      const response1 = await axios.get(
        "https://ernest-server.herokuapp.com/talent/" + this.props.id,
        { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
      );
      this.setState({ informations: response1.data.informations });
    }

    const response2 = await axios.get(
      "https://ernest-server.herokuapp.com/sector",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    const response3 = await axios.get(
      "https://ernest-server.herokuapp.com/title",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      arrayOfSectors: response2.data,
      arrayOfTitles: response3.data
    });
  }
}

export default TalentInformations;
