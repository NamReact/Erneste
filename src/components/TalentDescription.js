import React from "react";
import axios from "axios";
import TagList from "./TagList";
import { Link } from "react-router-dom";

class TalentDescriptions extends React.Component {
  state = {
    description: {
      idealCompany: "",
      idealRole: "",
      workingEnvironment: "",
      development: ""
    },
    skills: [],
    tagList: false
  };

  showTagList = () => {
    this.setState({ tagList: !this.state.tagList });
  };

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

  post = async () => {
    try {
      await axios.post(
        "https://ernest-server.herokuapp.com/talent/update",
        {
          id: this.props.id,
          description: this.state.description,
          skills: this.state.skills
        },
        { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  onSave = async () => {
    await this.post();
  };

  onCreate = () => {
    this.props.getDescription(this.state.description, this.state.skills);
  };

  render() {
    if (this.state.description === null) {
      return <div>Loading</div>;
    }
    if (this.props.save === true) {
      if (this.props.action === "update") {
        this.onSave();
      } else {
        this.onCreate();
      }
    }
    const description = this.state.description;

    return (
      <div className="right-container">
        <div>Fiche talent</div>
        <form>
          <div className="wishes">
            <h3>L'entreprise idéale</h3>
            <textarea
              readOnly={!this.props.isUpdating}
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
              readOnly={!this.props.isUpdating}
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
                readOnly={!this.props.isUpdating}
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
                readOnly={!this.props.isUpdating}
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

              {this.state.skills ? (
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
                        {this.props.isUpdating && (
                          <div
                            id={tag._id}
                            className="remove-tag"
                            onClick={this.removeTag}
                          >
                            x
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                false
              )}

              {this.props.isUpdating && (
                <div className="add-skills">
                  <div onClick={this.showTagList} className="add-skills-button">
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
              )}
            </div>
          </div>
        </form>
        {this.props.isUpdating && (
          <div className="buttons">
            <Link to={"/admin/talent-list"}>
              <div className="cancel">Annuler</div>
            </Link>
            {this.props.action === "update" ? (
              <div className="cancel" onClick={this.props.setUpdate}>
                Annuler les changements
              </div>
            ) : (
              false
            )}
            {this.props.action === "update" ? (
              <div className="validate" onClick={this.props.setSave}>
                Mettre à jour
              </div>
            ) : (
              <div className="validate" onClick={this.props.setSave}>
                Ajouter le profil
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  async componentDidMount() {
    if (this.props.id) {
      const response = await axios.get(
        "https://ernest-server.herokuapp.com/talent/" + this.props.id,
        { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
      );
      this.setState({
        description: response.data.description,
        skills: response.data.skills
      });
    }
  }
}

export default TalentDescriptions;
