import React from "react";
/* import axios from "axios"; */
/* import ReactFileReader from "react-file-reader"; */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Talent from "./components/Talent";
import NewTalent from "./components/NewTalent";
import TalentListPage from "./components/TalentList/TalentListPage";
import ClientList from "./components/ClientList/ClientList";
import TalentforTalent from "./components/TalentforTalent";

class App extends React.Component {
  state = {
    id: null
    /* mettre dans le state un token qui permet d'identifeir qui consulte la fiche, qui peut modifier quoi*/
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
            path="/admin/talent-create"
            component={() => <NewTalent getId={this.getId} />}
          />
          <Route
            exact={true}
            path="/admin/talent/:id"
            component={props => <Talent match={props.match} />}
          />
          <Route
            exact={true}
            path="/talent/:id"
            component={props => <TalentforTalent match={props.match} />}
          />
          <Route path="/admin/talent-list" component={TalentListPage} />
          <Route path="/admin/client-list" component={ClientList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
