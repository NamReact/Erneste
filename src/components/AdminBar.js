import React from "react";
import "./AdminBar.css";

class AdminBar extends React.Component {
  render() {
    return (
      <div className="admin-bar-container">
        <div id="Talent" onClick={this.props.setPage}>
          Talent
        </div>
        <div id="Mots clés" onClick={this.props.setPage}>
          Mots clés
        </div>
        <div id="Informations" onClick={this.props.setPage}>
          Informations
        </div>
      </div>
    );
  }
}

export default AdminBar;
