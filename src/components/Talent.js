import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Talent extends React.Component {
  state = {
    talent: {},
    isLoading: true
  };
  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement...</p>;
    }
    return <div>{this.props.match.params.id}</div>;
  }
}

export default Talent;
