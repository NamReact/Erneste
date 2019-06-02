import React from "react";
import axios from "axios";
import TalentInformations from "../components/TalentInformations";
import TalentInfoDisplay from "../components/TalentInfoDisplay";

/* Fiche qui apparait pour le Talent : il ne peut modifier que certains éléments de la description */

class TalentforTalent extends React.Component {
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
    arrayOfSectors: [],
    arrayOfTitles: [],
    validated: null,
    lastUpdate: null,
    isLoading: true,
    changing: null,
    tagList: false,
    sectorSelect: false,
    sizeSelect: false,
    titleSelect: false,
    statusSelect: false,
    isUpdating: false
  };

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
    informations.photo = files.base64;
    this.setState({
      informations: informations
    });
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

  getInformations = informations => {
    this.setState({ informations });
  };

  setUpdate = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  /* ***** */

  render() {
    /* Loader */

    if (this.state.isLoading === true) {
      return <p>En cours de chargement...</p>;
    }

    /* *** */
    const informations = this.state.informations;
    const description = this.state.description;
    const skills = this.state.skills;
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
      <div className="content">
        <div className="body-container">
          {this.state.isUpdating ? (
            <TalentInformations
              id={this.state.id}
              button={true}
              setUpdate={this.setUpdate}
            />
          ) : (
            <TalentInfoDisplay id={this.state.id} setUpdate={this.setUpdate} />
          )}

          <div className="right-container">
            <div>Fiche talent</div>
            <form>
              <div className="wishes">
                <h3>L'entreprise idéale</h3>
                <textarea
                  readOnly
                  id="ideal firm"
                  name="ideal firm"
                  value={description.idealCompany}
                />

                <h3>Mon rôle idéal</h3>
                <textarea
                  readOnly
                  id="ideal role"
                  name="ideal role"
                  value={description.idealRole}
                />
              </div>
              <div className="allWishes">
                <div className="sub-wishes">
                  <h3>Mes conditions idéales</h3>
                  <textarea
                    readOnly
                    id="ideal environment"
                    name="ideal environment"
                    value={description.workingEnvironment}
                  />

                  <h3>Mes ambitions d'évolution</h3>
                  <textarea
                    readOnly
                    id="ambitions"
                    name="ambitions"
                    value={description.development}
                  />
                </div>
                <div className="skills">
                  <h3>Skills</h3>

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
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    const response = await axios.get(
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
      id: response.data._id,
      informations: response.data.informations,
      description: response.data.description,
      skills: response.data.skills,
      validated: response.data.validated,
      lastUpdate: response.data.lastUpdate,
      arrayOfSectors: response2.data,
      arrayOfTitles: response3.data
    });
  }
}

export default TalentforTalent;
