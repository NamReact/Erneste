import React from "react";
import AdminBar from "../components/AdminBar";
import AdminTalent from "../components/AdminTalent";
import AdminInformation from "../components/AdminInformation";

import AdminChanges from "../components/AdminChanges";
import { Redirect } from "react-router-dom";

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
    /* Permission test */
    if (this.props.permission !== "Admin") {
      return <Redirect to={"/"} />;
    }
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
        {this.state.page === "Mots clés" ? (
          <AdminChanges token={this.props.token} />
        ) : (
          false
        )}
      </div>
    );
  }
}

export default Admin;
