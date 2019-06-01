import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import TagList from "./TagList";
import { Link } from "react-router-dom";

/* page admin talent : on peut tout modifier */

class TalentforAdmin extends React.Component {
  state = {
    id: null,

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
    description: null,
    skills: [],
    validated: null,
    lastUpdate: null,
    isLoading: true,
    changing: null,
    tagList: false,
    sectorSelect: false,
    sizeSelect: false,
    titleSelect: false,
    statusSelect: false
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
      const skills = this.state.skills.map(tag => {
        return tag._id;
      });

      const wantedSectorstoPost = this.state.informations.wantedSector.map(
        item => {
          return item._id;
        }
      );
      console.log("test", wantedSectorstoPost);
      const informationsbis = { ...this.state.informations };

      informationsbis.wantedSector = [...wantedSectorstoPost];

      const wantedTitlestoPost = this.state.informations.wantedTitle.map(
        item => {
          return item._id;
        }
      );
      informationsbis.wantedTitle = [...wantedTitlestoPost];
      await axios.post(
        "https://ernest-server.herokuapp.com/talent/update",
        {
          id: this.state.id,
          informations: informationsbis,
          description: this.state.description,
          skills: skills
        },
        { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
      );
    }
  };

  /* Function to handle wantedSector change*/

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

  setTag = tag => {
    const tagArray = this.state.skills;
    tagArray.push(tag);
    this.setState({ skills: tagArray });
  };

  showTagList = () => {
    this.setState({ tagList: !this.state.tagList });
  };

  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement...</p>;
    }

    const informations = this.state.informations;
    const description = this.state.description;
    const skills = this.state.skills;
    const lastUpdate = this.state.lastUpdate;
    let dotColor = "";

    const skillsArray = skills
      .map(tag => {
        return tag.name;
      })
      .join(" ");

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
      <div className="content" onClick={this.onClick}>
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
                    className="talent-picture"
                    src={informations.photo}
                    alt="portrait of talent"
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
              <div>Prénom</div>
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
              <div>Nom</div>
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

              {/*  <div className="availability">
                <div style={{ backgroundColor: dotColor }} />
                <select
                  value={this.state.informations.status}
                  onChange={this.handleAvailability}
                >
                  <option value="1">Recherche active</option>
                  <option value="2">Ouvert(e) aux opportunités</option>
                  <option value="3">Ne souhaite pas être contacté(e)</option>
                  <option value="4">Embauché(e) par Erneste</option>
                </select>
              </div> */}

              <div>Profil LinkedIn</div>
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
              <div>Email</div>
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
              <div>Téléphone</div>
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
              <div>Salaire</div>
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
              <div>Entreprise actuelle</div>
              <input
                id="Current company"
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
                onChange={e => {
                  const informations = { ...this.state.informations };
                  informations.actualTitle = { ...informations.actualTitle };
                  informations.actualTitle = e.target.value;
                  this.setState({
                    informations: informations
                  });
                }}
              />

              {/*  <input
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
            /> */}

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

              {/*  <div>
                {this.state.informations.wantedTitle.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.name}
                      <div
                        id={index}
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
              </div> */}
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

            <div>Modifé le {lastUpdate.split(",").shift()}</div>
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

              {/* <div className="validate" onClick={this.createTalent}>
                Ajouter le profil
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const response1 = await axios.get(
      "https://ernest-server.herokuapp.com/talent/" +
        this.props.match.params.id,
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    const response2 = await axios.get(
      "https://ernest-server.herokuapp.com/sector",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    const response3 = await axios.get(
      "https://ernest-server.herokuapp.com/title",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      isLoading: false,
      id: this.props.match.params.id,
      informations: response1.data.informations,
      description: response1.data.description,
      skills: response1.data.skills,
      validated: response1.data.validated,
      lastUpdate: response1.data.lastUpdate,
      arrayOfSectors: response2.data,
      arrayOfTitles: response3.data
    });
  }
}

export default TalentforAdmin;
