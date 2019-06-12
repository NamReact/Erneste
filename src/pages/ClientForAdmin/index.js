import React from "react";
import axios from "axios";
import ClientInformation from "../../components/ClientInformation/index";
import ClientUsers from "../../components/ClientUsers/index";
import PopUpClient from "../../components/PopUpClient/index";
import "./index.css";

/* Page to see client details, talents for client and add users */

class ClientforAdmin extends React.Component {
  state = {
    data: {
      name: "",
      field: {},
      size: "",
      users: null,
      activationKey: "",
      email: ""
    },
    popup: false
  };

  setPopUp = () => {
    this.setState({ popup: !this.state.popup });
  };

  render() {
    return (
      <div className="client-for-admin-container">
        <ClientInformation
          clientName={this.state.data.name}
          clientField={this.state.data.field.name}
          clientSize={this.state.data.size}
        />
        <ClientUsers
          users={this.state.data.users}
          setPopUp={this.setPopUp}
          activationKey={this.state.data.activationKey}
        />
        {this.state.popup && <div className="client-for-admin-overlay" />}
        {this.state.popup && (
          <PopUpClient
            setPopUp={this.setPopUp}
            clientEmail={this.state.data.email}
            token={this.props.token}
          />
        )}
      </div>
    );
  }
  async componentDidMount() {
    this.props.setPageActive("admin/client");
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/client/" +
        this.props.match.params.id,
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    this.setState({ data: response.data });
  }
}

export default ClientforAdmin;
