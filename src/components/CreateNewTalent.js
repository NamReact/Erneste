import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import TagList from "./TagList";
import { Link, Redirect } from "react-router-dom";

import "./newTalent.css";

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
      wantedSector: "",
      actualTitle: "",
      wantedTitle: "",
      status: "0"
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
    idTalentCreated: null
  };

  /* Function to save picture */
  handleFiles = files => {
    const informations = { ...this.state.informations };
    informations.photo = { ...informations.photo };
    const photo64 = files.base64;
    informations.photo = photo64;
    console.log(photo64);
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

  /* Function to poste new talent */
  createTalent = async e => {
    const skills = this.state.skills.map(tag => {
      return tag._id;
    });
    const response = await axios.post(
      "https://ernest-server.herokuapp.com/talent/create",
      {
        informations: this.state.informations,
        description: this.state.description,
        skills: skills
      }
    );
    this.setState({ idTalentCreated: response.data._id, redirect: true });
  };

  render() {
    const informations = { ...this.state.informations };
    const description = this.state.description;
    const skills = this.state.skills;
    const lastUpdate = this.state.lastUpdate;

    const skillsArray = skills
      .map(tag => {
        return tag.name;
      })
      .join(" ");

    return (
      <div className="content" onClick={this.onClick}>
        {this.state.redirect && (
          <Redirect to={"/admin/talent/" + this.state.idTalentCreated} />
        )}
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
                console.log("hello");
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
                console.log(e.target.value);
                informations.lastName = { ...informations.lastName };
                informations.lastName = e.target.value;
                this.setState({
                  informations: informations
                });
              }}
            />
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
          <div className="availability">
            <div
              onClick={() => {
                informations.status = { ...informations.status };
                informations.status = "1";
                this.setState({ informations });
              }}
              style={{
                backgroundColor: informations.status === "1" ? "red" : "white"
              }}
            />
            <div
              onClick={() => {
                informations.status = { ...informations.status };
                informations.status = "2";
                this.setState({ informations });
              }}
              style={{
                backgroundColor: informations.status === "2" ? "blue" : "white"
              }}
            />
            <div
              onClick={() => {
                informations.status = { ...informations.status };
                informations.status = "3";
                this.setState({ informations });
              }}
              style={{
                backgroundColor: informations.status === "3" ? "black" : "white"
              }}
            />
            <div
              onClick={() => {
                informations.status = { ...informations.status };
                informations.status = "4";
                this.setState({ informations });
              }}
              style={{
                backgroundColor: informations.status === "4" ? "green" : "white"
              }}
            />
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

        <div className="buttons">
          <Link to={"/admin/talent-list"}>
            <div className="cancel">X</div>
          </Link>
          {/* lien à faire vers liste des talents */}

          <div className="validate" onClick={this.createTalent}>
            {/* lien à faire vers page talent validée */}
            Yes
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNewTalent;
