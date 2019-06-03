import React from "react";
import { Link } from "react-router-dom";
import logo from "../features/img/logo.svg";

import "./HeaderAdmin.css";

function HeaderAdmin(props) {
  let classNameClient = "";
  let classNameTalent = "";
  if (props.pageType === "admin/client") {
    classNameClient = "headerAdmin-tools-active";
  } else {
    classNameClient = "headerAdmin-tools-inactive";
  }
  if (props.pageType === "admin/talent") {
    classNameTalent = "headerAdmin-tools-active";
  } else {
    classNameTalent = "headerAdmin-tools-inactive";
  }
  return (
    <header>
      <div className="headerAdmin-container">
        <img className="headerAdmin-image" src={logo} alt="Erneste Logo" />
        {(props.pageType === "admin/talent" ||
          props.pageType === "admin/client") && (
          <div className="headerAdmin-tools">
            {/* Lien vers Talent-List */}
            <Link className="linkDecoration" to={`/admin/talent-list`}>
              <span className={classNameTalent}>Talents</span>
            </Link>
            {/* Lien vers Client-List */}
            <Link className="linkDecoration" to={`/admin/client-list`}>
              <span className={classNameClient}>Clients</span>
            </Link>
            {/* Log Out Bouton */}
            <div
              onClick={props.handleClickLogOut}
              className="headerAdmin-tools-logOut"
            >
              <i className="fas fa-power-off" />
            </div>
          </div>
        )}
        {props.pageType === "talent" && (
          <div className="headerAdmin-tools">
            {/* Lien vers Talent-List */}
            <Link className="linkDecoration" to={`/admin/talent-list`}>
              <span className={classNameTalent}>Talents</span>
            </Link>
            {/* Lien vers Client-List */}
            <Link className="linkDecoration" to={`/admin/client-list`}>
              <span className={classNameClient}>Clients</span>
            </Link>
            {/* Log Out Bouton */}
            <div
              onClick={props.handleClickLogOut}
              className="headerAdmin-tools-logOut"
            >
              <i className="fas fa-power-off" />
            </div>
          </div>
        )}
        {props.pageType === "client" && (
          <div className="headerAdmin-tools">
            {/* Lien vers Talent-List */}
            <Link className="linkDecoration" to={`/admin/talent-list`}>
              <span className={classNameTalent}>Talents</span>
            </Link>
            {/* Lien vers Client-List */}
            <Link className="linkDecoration" to={`/admin/client-list`}>
              <span className={classNameClient}>Clients</span>
            </Link>
            {/* Log Out Bouton */}
            <div
              onClick={props.handleClickLogOut}
              className="headerAdmin-tools-logOut"
            >
              <i className="fas fa-power-off" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderAdmin;
