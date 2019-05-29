import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home(props) {
  return (
    <div className="containerBis">
      <div>
        <div className="title">Page Home provisoire</div>
        <Link to={`/admin/talent-list`} className="header-element">
          Lien vers Talent-list
        </Link>
        <Link to={`/admin/client-list`} className="header-element">
          Lien vers Client-list
        </Link>
      </div>
    </div>
  );
}

export default Home;
