import React from "react";

import "./Header.css";

function Header(props) {
  return (
    <div className="header-container">
      <div className="header-element">Talents</div>
      <div className="header-element">Clients</div>
      <div className="header-element">Log Out</div>
    </div>
  );
}

export default Header;
