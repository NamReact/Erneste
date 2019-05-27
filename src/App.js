import React from "react";
/* import axios from "axios"; */
/* import ReactFileReader from "react-file-reader"; */
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Talent from "./components/Talent";
import NewTalent from "./components/NewTalent";

class App extends React.Component {
  state = {
    id: null
  };

  getId = id => {
    this.setState({ id: id });
  };

  render() {
    return (
      <Router>
        <Route
          exact={true}
          path="/"
          component={() => <NewTalent getId={this.getId} />}
        />

        {this.state.id === null ? (
          <Route
            exact={true}
            path="/talent/:id"
            component={props => <Talent match={props.match} />}
          />
        ) : (
          <Redirect to={`/talent/${this.state.id}`} />
        )}
      </Router>
    );
  }
}

export default App;
