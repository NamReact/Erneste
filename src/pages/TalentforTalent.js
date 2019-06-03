import React from "react";
import axios from "axios";
import TalentInformations from "../components/TalentInformations";
import TalentInfoDisplay from "../components/TalentInfoDisplay";
import TalentDescription from "../components/TalentDescription";

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
    );
  }
  async componentDidMount() {
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
