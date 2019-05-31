import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import TagList from "./TagList";

/* page admin talent : on peut tout modifier */

class TalentforAdmin extends React.Component {
  state = {
    id: null,
    permission: null,
    informations: null,
    description: null,
    skills: [],
    validated: null,
    lastUpdate: null,
    isLoading: true,
    changing: null,
    tagList: false
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
      await axios.post(
        "https://ernest-server.herokuapp.com/talent/update",
        {
          id: this.state.id,
          informations: this.state.informations,
          description: this.state.description,
          skills: skills
        },
        { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
      );
      console.log("posted");
    } else {
      console.log("same");
    }
  };

  /* Function to set availability */
  handleAvailability = async e => {
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
    await axios.post(
      "https://ernest-server.herokuapp.com/talent/update",
      {
        id: this.state.id,
        informations: this.state.informations
      },
      { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
    );
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
              id="Desired sector"
              name="Desired sector"
              value={informations.wantedSector}
              onChange={e => {
                const informations = { ...this.state.informations };
                informations.wantedSector = { ...informations.wantedSector };
                informations.wantedSector = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
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
            />
          </form>

          <div>
            <div>Client 1</div> {/* link to clients attibuted to talent */}
            <div>Client 2</div>
            <div>Client 3</div>
            <div>Client 4</div>
          </div>

          <div>{lastUpdate}</div>
        </div>

        <div>
          <form>
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

            <div className="allWishes">
              <div className="wishes">
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
                <textarea name="hardskills" value={skillsArray} />
                <div onClick={this.showTagList}>Show tag list</div>
              </div>
            </div>
          </form>
        </div>
        {this.state.tagList === true ? <TagList setTag={this.setTag} /> : null}
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/" +
        this.props.match.params.id,
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      isLoading: false,
      id: this.props.match.params.id,
      informations: response.data.informations,
      description: response.data.description,
      skills: response.data.skills,
      validated: response.data.validated,
      lastUpdate: response.data.lastUpdate
    });
  }
}

export default TalentforAdmin;
