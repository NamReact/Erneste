import React from "react";
import { Link } from "react-router-dom";
import logo from "../features/img/logo.svg";

import "./HeaderAdmin.css";

function HeaderAdmin(props) {
  let classNameAdminClient = "";
  let classNameAdminTalent = "";
  let classNameAdminConfig = "";
  let classNameTalentOpportunities = "";
  let classNameTalentProfil = "";
  if (props.pageType === "admin/client") {
    classNameAdminClient = "headerAdmin-tools-active";
  } else {
    classNameAdminClient = "headerAdmin-tools-inactive";
  }
  if (props.pageType === "admin/talent") {
    classNameAdminTalent = "headerAdmin-tools-active";
  } else {
    classNameAdminTalent = "headerAdmin-tools-inactive";
  }
  if (props.pageType === "admin/config") {
    classNameAdminConfig = "headerAdmin-tools-active";
  } else {
    classNameAdminConfig = "headerAdmin-tools-inactive";
  }

  if (props.pageType === "talent") {
    classNameTalentProfil = "headerAdmin-tools-active";
  } else {
    classNameTalentOpportunities = "headerAdmin-tools-inactive";
  }
  if (props.pageType === "talent/opportunities") {
    classNameTalentProfil = "headerAdmin-tools-active";
  } else {
    classNameTalentOpportunities = "headerAdmin-tools-inactive";
  }
  return (
    <header>
      <div className="headerAdmin-container">
        <img className="headerAdmin-image" src={logo} alt="Erneste Logo" />
        {(props.pageType === "admin/talent" ||
          props.pageType === "admin/client" ||
          props.pageType === "admin/config") && (
          <div className="headerAdmin-tools">
            {/* Lien vers Talent-List */}
            <Link className="linkDecoration" to={`/admin/talent-list`}>
              <span className={classNameAdminTalent}>Talents</span>
            </Link>
            {/* Lien vers Client-List */}
            <Link className="linkDecoration" to={`/admin/client-list`}>
              <span className={classNameAdminClient}>Clients</span>
            </Link>
            {/* Lien vers Config */}
            <Link className="linkDecoration" to={`/admin/config`}>
              <i className={`fas fa-cog ${classNameAdminConfig}`} />
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
            {/* Lien vers Opportunités */}
            <Link className="linkDecoration" to={`/talent/opportunities/`}>
              <i
                className={`fas fa-envelope ${classNameTalentOpportunities} `}
              />
            </Link>
            {/* Lien vers son Profil */}
            <Link className="linkDecoration" to={`/talent/${props.userID}`}>
              <i className={`fas fa-user ${classNameTalentProfil}`} />
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
