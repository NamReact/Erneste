import React from "react";
import TalentInformations from "../components/TalentInformations";
import TalentInfoDisplay from "../components/TalentInfoDisplay";
import TalentDescription from "../components/TalentDescription";

/* *** Page for Admin. Everything can be modified *** */

class TalentforAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: null,
      isUpdating: false,
      save: false
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

  render() {
    return (
      <div className="content">
        <div className="body-container">
          {this.state.isUpdating ? (
            <TalentInformations
              id={this.props.match.params.id}
              button={false}
              setUpdate={this.setUpdate}
              save={this.state.save}
              setSave={this.save}
              stopSave={this.stopSave}
            />
          ) : (
            <TalentInfoDisplay
              id={this.props.match.params.id}
              setUpdate={this.setUpdate}
              isUpdating={this.state.isUpdating}
            />
          )}

          <TalentDescription
            action="update"
            id={this.props.match.params.id}
            isUpdating={this.state.isUpdating}
            save={this.state.save}
            setSave={this.save}
            setUpdate={this.setUpdate}
            stopSave={this.stopSave}
          />
        </div>
      </div>
    );
  }
  async componentDidMount() {
    this.props.setPageActive("admin/talent");
  }
}

export default TalentforAdmin;
