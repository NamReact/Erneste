import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function Header(props) {
  return (
    <div className="header-container">
      <Link to={`/admin/talent-list`} className="header-element">
        Talents
      </Link>
      <Link to={`/admin/client-list`} className="header-element">
        Clients
      </Link>
      <div className="header-element">Log Out</div>
    </div>
  );
}

export default Header;
