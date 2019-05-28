import React from "react";
/* import axios from "axios"; */
/* import ReactFileReader from "react-file-reader"; */
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Talent from "./components/Talent";
import NewTalent from "./components/NewTalent";
import TalentListPage from "./components/TalentList/TalentListPage";

class App extends React.Component {
  state = {
    id: null
  };

  /* getId = id => {
    this.setState({ id: id });
  }; */

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact={true}
            path="/"
            component={() => <NewTalent getId={this.getId} />}
          />
          <Route
            exact={true}
            path="/talent/:id"
            component={props => <Talent match={props.match} />}
          />
          <Route path="/admin/talent" component={TalentListPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
