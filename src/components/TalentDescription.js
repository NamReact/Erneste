import React from "react";
import TagList from "./TagList";
import { Link } from "react-router-dom";

class TalentDescriptions extends React.Component {
  state = {
    tagList: false
  };

  showTagList = () => {
    this.setState({ tagList: !this.state.tagList });
  };

  tagArrayPush = (tagArray, tag) => {
    tagArray.push(tag);
    this.props.setSkills(tagArray);
  };

  setTag = tag => {
    if (this.props.skills === null) {
      const tagArray = [];
      this.tagArrayPush(tagArray, tag);
    } else {
      const tagArray = this.props.skills;
      this.tagArrayPush(tagArray, tag);
    }
  };

  render() {
    const description = this.props.description;
    return (
      <div className="right-container">
        <div>Fiche talent</div>
        <form>
          <div className="wishes">
            <h3 className="talentDescription-h3">L'entreprise idéale</h3>
            <textarea
              id="idealCompany"
              readOnly={!this.props.isUpdating}
              name="ideal firm"
              value={description.idealCompany}
              onChange={e => this.props.setDescription(e)}
            />

            <h3 className="talentDescription-h3">Mon rôle idéal</h3>
            <textarea
              id="idealRole"
              readOnly={!this.props.isUpdating}
              name="ideal role"
              value={description.idealRole}
              onChange={e => this.props.setDescription(e)}
            />
          </div>
          <div className="allWishes">
            <div className="sub-wishes">
              <h3 className="talentDescription-h3">Mes conditions idéales</h3>
              <textarea
                id="workingEnvironment"
                readOnly={this.props.update}
                name="ideal environment"
                value={description.workingEnvironment}
                onChange={e => this.props.setDescription(e)}
              />

              <h3 className="talentDescription-h3">
                Mes ambitions d'évolution
              </h3>
              <textarea
                id="development"
                readOnly={!this.props.isUpdating}
                name="ambitions"
                value={description.development}
                onChange={e => this.props.setDescription(e)}
              />
            </div>
            <div className="skills">
              <h3 className="talentDescription-h3">Skills</h3>

              {this.props.skills ? (
                <div>
                  {this.props.skills.map((tag, index) => {
                    return (
                      <div
                        key={tag._id}
                        className="tag"
                        style={{
                          backgroundColor:
                            tag.type === "hard" ? "#333266" : "#EF6364"
                        }}
                      >
                        <div className="talentDescription-tag-name">
                          {tag.name}
                        </div>
                        {this.props.isUpdating && (
                          <div
                            id={index}
                            className="talentDescription-remove-tag"
                            onClick={e => this.props.deleteSkills(e.target.id)}
                          >
                            <img
                              src={
                                tag.type === "hard"
                                  ? require("../features/icons/blue-cross.svg")
                                  : require("../features/icons/pink-cross.svg")
                              }
                            />
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
                      ? "Ajouter des skills"
                      : "Fermer la liste"}
                  </div>
                  {this.state.tagList === true ? (
                    <TagList setTag={this.setTag} />
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
              <div className="validate" onClick={this.props.update}>
                Mettre à jour
              </div>
            ) : (
              <div className="validate" onClick={this.props.post}>
                Ajouter le profil
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default TalentDescriptions;
