import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import TagList from "./TagList";
import { Link, Redirect } from "react-router-dom";

import "./CreateNewTalent.css";

/* Page to create a talent */

class CreateNewTalent extends React.Component {
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
      status: null
    },
    description: {
      idealCompany: "",
      idealRole: "",
      workingEnvironment: "",
      development: ""
    },
    skills: [],
    tagList: false,
    redirect: false,
    idTalentCreated: null,
    loadingTitle: true,
    loadingSector: true,
    arrayOfSectors: [],
    arrayOfTitles: [],
    sectorSelect: false,
    sizeSelect: false,
    titleSelect: false,
    statusSelect: false,
    actualSelect: null
  };

  /* setWrapper = node => (this.state.actualSelect = node); */

  /* ** INTERRUPTERS ** */

  showTagList = () => {
    this.setState({ tagList: !this.state.tagList });
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

  /* ***** */

  /* ** ON CHANGE FUNCTIONS ** */

  /* Function to save picture */

  handleFiles = files => {
    const informations = { ...this.state.informations };
    informations.photo = { ...informations.photo };
    const photo64 = files.base64;
    informations.photo = photo64;
    this.setState({
      informations: informations
    });
  };

  /* Function to handle wantedSector change */

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

  /* Function to handle wantedTitle change*/

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
    informations.size = e.target.id;
    this.setState({ informations, sizeSelect: false });
  };

  /* Function to set availability */

  handleAvailability = e => {
    const informations = this.state.informations;
    informations.status = e.target.id;
    this.setState({ informations });
  };

  /* Function to set and remove tags */

  setTag = tag => {
    const tagArray = this.state.skills;
    tagArray.push(tag);
    this.setState({ skills: tagArray });
  };

  removeTag = e => {
    const skillsArray = [...this.state.skills];
    for (let i = 0; i < skillsArray.length; i++) {
      if (skillsArray[i]._id === e.target.id) {
        skillsArray.splice(i, 1);
        break;
      }
    }
    this.setState({ skills: skillsArray });
  };

  /* ***** */

  /* ** CREATE A TALENT ** */

  createTalent = async e => {
    /* The API require an array of strings for those keys */

    const skills = this.state.skills.map(tag => {
      return tag._id;
    });
    const wantedSectorstoPost = this.state.informations.wantedSector.map(
      item => {
        return item._id;
      }
    );
    let wantedSectorCopy = [...this.state.informations.wantedSector];
    wantedSectorCopy = [...wantedSectorstoPost];
    this.state.informations.wantedSector = [...wantedSectorCopy];

    const wantedTitlestoPost = this.state.informations.wantedTitle.map(item => {
      return item._id;
    });
    let wantedTitleCopy = [...this.state.informations.wantedTitle];
    wantedTitleCopy = [...wantedTitlestoPost];
    this.state.informations.wantedTitle = [...wantedTitleCopy];

    const response = await axios.post(
      "https://ernest-server.herokuapp.com/talent/create",
      {
        informations: this.state.informations,
        description: this.state.description,
        skills: skills
      },
      { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({ idTalentCreated: response.data._id, redirect: true });
  };

  render() {
    /* Loader */

    if (this.state.loadingTitle === true || this.state.loadingSector === true) {
      return <p>En cours de chargement...</p>;
    }

    /* *** */

    const informations = { ...this.state.informations };
    const description = this.state.description;
    const skills = this.state.skills;
    const lastUpdate = this.state.lastUpdate;
    let dotColor = "";

    /* Conditions for the color of the dot */

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
      <div className="content">
        {this.state.redirect && (
          <Redirect to={"/admin/talent/" + this.state.idTalentCreated} />
        )}
        <div className="body-container">
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
                    src={informations.photo}
                    alt="portrait of talent"
                    className="talentPicture"
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
                id="First Name"
                name="First Name"
                value={informations.firstName}
                placeholder="Prénom"
                onChange={e => {
                  informations.firstName = { ...informations.firstName };
                  informations.firstName = e.target.value;
                  this.setState({
                    informations: informations
                  });
                }}
              />
              <div>Nom</div>
              <input
                id="Last Name"
                name="Last Name"
                value={informations.lastName}
                placeholder="Nom"
                onChange={e => {
                  informations.lastName = { ...informations.lastName };
                  informations.lastName = e.target.value;
                  this.setState({
                    informations: informations
                  });
                }}
              />
              <div>Profil LinkedIn</div>
              <input
                id="LinkedIn Profil"
                name="LinkedIn Profil"
                value={informations.linkedIn}
                placeholder="LinkedIn"
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
                id="email"
                name="email"
                value={informations.email}
                placeholder="Email"
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
                id="phone number"
                name="phone number"
                value={informations.phoneNumber}
                placeholder="Numéro de téléphone"
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
                id="Wage"
                name="Wage"
                value={informations.salary}
                placeholder="Salaire"
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
                id="Current company"
                name="Current company"
                value={informations.actualCompany}
                placeholder="Entreprise actuelle"
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
                  <div id="sector-list" className="sector-list">
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
                  {this.state.informations.size ? (
                    <div style={{ color: "#333266" }}>
                      {this.state.informations.size}
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
                id="Current position"
                name="Current position"
                value={informations.actualTitle}
                placeholder="Position actuelle"
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
                          informations.wantedTitle = [
                            ...informations.wantedTitle
                          ];
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
                      borderWidth: this.state.informations.status
                        ? "none"
                        : "1px",
                      borderStyle: this.state.informations.status
                        ? "none"
                        : "solid"
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

            <div>{lastUpdate}</div>
          </div>

          <div className="right-container">
            <div>Fiche talent</div>
            <form>
              <div className="wishes">
                <h3>L'entreprise idéale</h3>
                <textarea
                  id="ideal firm"
                  name="ideal firm"
                  value={description.idealCompany}
                  placeholder="Entrerpise idéale"
                  onChange={e => {
                    const description = { ...this.state.description };
                    description.idealCompany = { ...description.idealCompany };
                    description.idealCompany = e.target.value;
                    this.setState({
                      description: description
                    });
                  }}
                />

                <h3>Mon rôle idéal</h3>
                <textarea
                  id="ideal role"
                  name="ideal role"
                  value={description.idealRole}
                  placeholder="Rôle idéal"
                  onChange={e => {
                    const description = { ...this.state.description };
                    description.idealRole = { ...description.idealRole };
                    description.idealRole = e.target.value;
                    this.setState({
                      description: description
                    });
                  }}
                />
              </div>
              <div className="allWishes">
                <div className="sub-wishes">
                  <h3>Mes conditions idéales</h3>
                  <textarea
                    id="ideal environment"
                    name="ideal environment"
                    value={description.workingEnvironment}
                    placeholder="Conditions idéales"
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

                  <h3>Mes ambitions d'évolution</h3>
                  <textarea
                    id="ambitions"
                    name="ambitions"
                    value={description.development}
                    placeholder="Ambitions d'évolution"
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
                  <h3>Skills</h3>

                  {/* skillsArray */}
                  {this.state.skills.length > 0 ? (
                    <div>
                      {this.state.skills.map(tag => {
                        return (
                          <div
                            key={tag._id}
                            className="tag"
                            style={{
                              backgroundColor:
                                tag.type === "hard" ? "#333266" : "#EF6364"
                            }}
                          >
                            <div className="tag-name">{tag.name}</div>
                            <div
                              id={tag._id}
                              className="remove-tag"
                              onClick={this.removeTag}
                            >
                              x
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    false
                  )}
                  {/*  <textarea name="hardskills" value={skillsArray} required /> */}

                  <div className="add-skills">
                    <div
                      onClick={this.showTagList}
                      className="add-skills-button"
                    >
                      {this.state.tagList === false
                        ? "+ Ajouter skills"
                        : "- Fermer la liste"}
                    </div>
                    {this.state.tagList === true ? (
                      <TagList
                        class="tag-pop-up"
                        listClass="pop-up-list"
                        buttons="tag-list-buttons"
                        setTag={this.setTag}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </form>
            <div className="buttons">
              <Link to={"/admin/talent-list"}>
                <div className="cancel">Annuler</div>
              </Link>

              <div className="validate" onClick={this.createTalent}>
                Ajouter le profil
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/sector",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    const response2 = await axios.get(
      "https://ernest-server.herokuapp.com/title",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      arrayOfSectors: response.data,
      arrayOfTitles: response2.data,
      loadingTitle: false,
      loadingSector: false
    });
  }
}

export default CreateNewTalent;
