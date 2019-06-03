import React from "react";
import axios from "axios";
import TalentInformations from "../components/TalentInformations";
import TalentInfoDisplay from "../components/TalentInfoDisplay";
import TalentDescription from "../components/TalentDescription";
import HeaderAdmin from "../components/HeaderAdmin";

/* Fiche qui apparait pour le Talent : il ne peut modifier que certains éléments de la description */

class TalentforTalent extends React.Component {
  state = {
    validated: null,
    isLoading: true,
    isUpdating: false
  };

  /* ** INTERRUPTERS ** */
  setUpdate = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  render() {
    return (
      <div>
        <HeaderAdmin
          handleClickLogOut={this.props.handleClickLogOut}
          pageType="talent"
        />
        <div className="content">
          {false && this.state.validated}
          <div className="body-container">
            {this.state.isUpdating ? (
              <TalentInformations
                action="update"
                id={this.props.match.params.id}
                button={true}
                setUpdate={this.setUpdate}
              />
            ) : (
              <TalentInfoDisplay
                id={this.props.match.params.id}
                setUpdate={this.setUpdate}
              />
            )}

            <TalentDescription id={this.props.match.params.id} />
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    this.props.setPageActive("talent");
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/" +
        this.props.match.params.id,
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      validated: response.data.validated
    });
  }
}

export default TalentforTalent;
