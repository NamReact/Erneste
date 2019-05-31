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
      status: "1"
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
    arrayOfTitles: []
  };

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

  setTag = tag => {
    const tagArray = this.state.skills;
    tagArray.push(tag);
    this.setState({ skills: tagArray });
  };

  showTagList = () => {
    this.setState({ tagList: !this.state.tagList });
  };

  /* Function to handle wantedSector change*/

  handlewantedSector = e => {
    const informationsCopy = this.state.informations;
    informationsCopy.wantedSector = [...this.state.informations.wantedSector];
    for (let i = 0; i < this.state.arrayOfSectors.length; i++) {
      if (e.target.value === this.state.arrayOfSectors[i].name) {
        informationsCopy.wantedSector.push(this.state.arrayOfSectors[i]);
      }
    }
    this.setState({ informations: informationsCopy });
  };

  /* Function to handle wantedTitle change*/

  handlewantedTitle = e => {
    const informationsCopy = this.state.informations;
    informationsCopy.wantedTitle = [...this.state.informations.wantedTitle];
    for (let i = 0; i < this.state.arrayOfTitles.length; i++) {
      if (e.target.value === this.state.arrayOfTitles[i].name) {
        informationsCopy.wantedTitle.push(this.state.arrayOfTitles[i]);
      }
    }
    this.setState({ informations: informationsCopy });
  };

  /* Function to handle company size */

  handleSize = e => {
    const informations = this.state.informations;
    if (e.target.value === "Petite") {
      informations.wantedSize = { ...informations.wantedSize };
      informations.wantedSize = "Petite";
      this.setState({ informations });
    }
    if (e.target.value === "Grosse") {
      informations.wantedSize = { ...informations.wantedSize };
      informations.wantedSize = "Grosse";
      this.setState({ informations });
    }
  };

  /* Function to set availability */
  handleAvailability = e => {
    const informations = this.state.informations;
    if (e.target.value === "1") {
      informations.status = { ...informations.status };
      informations.status = "1";
      this.setState({ informations });
    }
    if (e.target.value === "2") {
      informations.status = { ...informations.status };
      informations.status = "2";
      this.setState({ informations });
    }
    if (e.target.value === "3") {
      informations.status = { ...informations.status };
      informations.status = "3";
      this.setState({ informations });
    }
    if (e.target.value === "4") {
      informations.status = { ...informations.status };
      informations.status = "4";
      this.setState({ informations });
    }
  };

  /* Function to poste new talent */
  createTalent = async e => {
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
    if (this.state.loadingTitle === true || this.state.loadingSector === true) {
      return <p>En cours de chargement...</p>;
    }

    const informations = { ...this.state.informations };
    const description = this.state.description;
    const skills = this.state.skills;
    const lastUpdate = this.state.lastUpdate;
    let dotColor = "";

    const skillsArray = skills
      .map(tag => {
        return tag.name;
      })
      .join(" ");

    /* Conditions for the color of the dot */

    if (this.state.informations.status === "1") {
      dotColor = "#9EBA83";
    }
    if (this.state.informations.status === "2") {
      dotColor = "#F2E9A7";
    }
    if (this.state.informations.status === "3") {
      dotColor = "#FF9D9D";
    }
    if (this.state.informations.status === "4") {
      dotColor = "#6A6A8F";
    }

    return (
      <div className="content" onClick={this.onClick}>
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
                <span>
                  <img
                    src={informations.photo}
                    alt="portrait of talent"
                    className="talentPicture"
                  />
                </span>
              ) : (
                <div className="empty-photo" />
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
                placeholder="email"
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
                placeholder="numéro téléphone"
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
                placeholder="salaire"
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
                    <div key={index}>
                      {item.name}
                      <div
                        id={index}
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
              <select
                value={this.state.arrayOfSectors[0].name}
                onChange={this.handlewantedSector}
              >
                {this.state.arrayOfSectors.map((sector, index) => {
                  return <option key={index}>{sector.name}</option>;
                })}
              </select>

              <div>Taille d'entreprise souhaitée</div>
              <select
                value={this.state.informations.wantedSize}
                onChange={this.handleSize}
              >
                <option value="Petite">Petite entreprise</option>
                <option value="Grosse">Grosse entreprise</option>
              </select>

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
              </div>
              <select
                value={this.state.arrayOfTitles[0].name}
                onChange={this.handlewantedTitle}
              >
                {this.state.arrayOfTitles.map((title, index) => {
                  return <option key={index}>{title.name}</option>;
                })}
              </select>
            </form>
            <div>Statut</div>
            <div className="availability">
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
            </div>

            <div>{lastUpdate}</div>
          </div>

          <div>
            <div>Fiche talent</div>
            <form>
              <div className="wishes">
                <div>L'entreprise idéale</div>
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

                <div>Mon rôle idéal</div>
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
                <div className="wishes">
                  <div>Mes conditions idéales</div>
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

                  <div>Mes ambitions d'évolution</div>
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
                  <div>Skills</div>
                  <textarea name="hardskills" value={skillsArray} required />
                  <div onClick={this.showTagList}>Show tag list</div>
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
          {this.state.tagList === true ? (
            <TagList setTag={this.setTag} />
          ) : null}
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
