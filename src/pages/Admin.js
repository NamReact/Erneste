import React from "react";
import AdminBar from "../components/AdminBar";
import AdminTalent from "../components/AdminTalent";
import AdminInformation from "../components/AdminInformation";
import { Redirect } from "react-router-dom";
import AdminChanges from "../components/AdminChanges";


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
        {this.state.page === "Mots clés" ? <AdminChanges /> : false}
      </div>
    );
  }

  async componentDidMount() {
    this.props.setPageActive("admin/config");
  }
}

export default Admin;
