import React from "react";
import AdminBar from "../components/AdminBar";
import AdminTalent from "../components/AdminTalent";
import AdminInformation from "../components/AdminInformation";

class Admin extends React.Component {
  state = {
    page: "",
    isUpdating: false
  };

  setPage = e => {
    const page = e.target.id;
    this.setState({ page });
  };

  render() {
    return (
      <div>
        <AdminBar setPage={this.setPage} />

        {this.state.page === "Talent" ? (
          <AdminTalent token={this.props.token} />
        ) : (
          false
        )}
        {this.state.page === "Informations" ? (
          <AdminInformation
            isUpdating={this.state.isUpdating}
            token={this.props.token}
          />
        ) : (
          false
        )}
      </div>
    );
  }
}

export default Admin;