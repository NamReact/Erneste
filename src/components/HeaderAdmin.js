import React from "react";
import { Link } from "react-router-dom";
import logo from "../features/img/logo.svg";

import "./HeaderAdmin.css";

function HeaderAdmin(props) {
  return (
    <header>
      <div className="headerAdmin-container">
        <img className="headerAdmin-image" src={logo} alt="Erneste Logo" />
        <div className="headerAdmin-tools">
          <Link className="linkDecoration" to={`/admin/talent-list`}>
            <span className="headerAdmin-tools-talents">Talents</span>
          </Link>
          <Link className="linkDecoration" to={`/admin/client-list`}>
            <span className="headerAdmin-element-tools-clients">Clients</span>
          </Link>
          <div className="headerAdmin-element-tools-logOut">
            <i class="fas fa-power-off" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
