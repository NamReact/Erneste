import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import TalentDescription from "../components/TalentDescription";
import TalentInformations from "../components/TalentInformations";

import "../components/CreateNewTalent.css";

/* Page to create a talent */

class CreateNewTalent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      description: {
        idealCompany: "",
        idealRole: "",
        workingEnvironment: "",
        development: ""
      },
      skills: null,
      redirect: false
    };
  }
  /* ** INTERRUPTERS ** */

  setInformations = e => {
    const key = e.target.id;
    const informations = this.state.informations;
    informations[key] = e.target.value;
    this.setState({ informations });
  };

  setPhoto = photo => {
    const informations = this.state.informations;
    informations.photo = photo;
    this.setState({ informations });
  };

  setTitle = title => {
    const informations = this.state.informations;
    informations.title = title;
    this.setState({ informations });
  };

  deleteTitle = i => {
    const informations = this.state.informations;
    informations.wantedTitle.splice(i, 1);
    this.setState({ informations });
  };

  setSize = wantedSize => {
    const informations = this.state.informations;
    informations.wantedSize = wantedSize;
    this.setState({ informations });
  };

  setStatus = status => {
    const informations = this.state.informations;
    informations.status = status;
    this.setState({ informations });
  };

  setSector = sector => {
    const informations = this.state.informations;
    informations.sector = sector;
    this.setState({ informations });
  };

  deleteSector = i => {
    const informations = this.state.informations;
    informations.wantedSector.splice(i, 1);
    this.setState({ informations });
  };

  setDescription = e => {
    const key = e.target.id;
    const description = this.state.description;
    description[key] = e.target.value;
    this.setState({ description });
  };

  setSkills = skills => {
    this.setState({ skills });
  };

  deleteSkills = i => {
    const skills = this.state.skills;
    skills.splice(i, 1);
    this.setState({ skills });
  };

  post = async () => {
    await axios.post(
      "https://ernest-server.herokuapp.com/talent/create",
      {
        informations: this.state.informations,
        description: this.state.description,
        skills: this.state.skills
      },
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({ redirect: true });
    return;
  };

  render() {
    return (
      <div>
        <div className="content">
          {this.state.redirect && <Redirect to="/admin/talent-list" />}
          <div className="body-container">
            <TalentInformations
              button={false}
              informations={this.state.informations}
              setInformations={this.setInformations}
              setPhoto={this.setPhoto}
              setTitle={this.setTitle}
              deleteTitle={this.deleteTitle}
              setSize={this.setSize}
              setStatus={this.setStatus}
              setSector={this.setSector}
              deleteSector={this.deleteSector}
            />

            <TalentDescription
              isUpdating={true}
              post={this.post}
              description={this.state.description}
              skills={this.state.skills}
              setDescription={this.setDescription}
              setSkills={this.setSkills}
              deleteSkills={this.deleteSkills}
            />
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.props.setPageActive("admin/talent");
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
