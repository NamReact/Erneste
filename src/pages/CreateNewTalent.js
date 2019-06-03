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
      informations: null,
      description: null,
      skills: null,
      redirect: false,
      idTalentCreated: null,
      loadingTitle: true,
      loadingSector: true,
      save: false,
      actualSelect: null
    };
  }
  /* ** INTERRUPTERS ** */

  setUpdate = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  save = () => {
    this.setState({ save: true });
  };

  stopSave = () => {
    this.setState({ save: false });
  };

  getInformations = async informations => {
    await this.setState({ informations });
  };

  getDescription = async (description, skills) => {
    await this.setState({ description, skills });
  };

  post = async () => {
    const response = await axios.post(
      "https://ernest-server.herokuapp.com/talent/create",
      {
        informations: this.state.informations,
        description: this.state.description,
        skills: this.state.skills
      },
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );
    console.log(response.data);
    return;

    /* this.setState({ redirect: true }); */
  };

  render() {
    if (
      this.state.informations &&
      this.state.description &&
      this.state.skills
    ) {
      this.post();
      setTimeout(1000);
      return <Redirect to="/admin/talent-list" />;
    }
    return (
      <div>
        <div className="content">
          {this.state.redirect && <Redirect to="/admin/talent-list" />}
          <div className="body-container">
            <TalentInformations
              button={false}
              getInformations={this.getInformations}
              save={this.state.save}
            />

            <TalentDescription
              action="create"
              isUpdating={true}
              getDescription={this.getDescription}
              save={this.state.save}
              setSave={this.save}
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
