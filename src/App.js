import React from "react";
/* import axios from "axios"; */
/* import ReactFileReader from "react-file-reader"; */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import TalentforAdmin from "./components/TalentforAdmin";
import CreateNewTalent from "./components/CreateNewTalent";
import TalentListPage from "./components/TalentList/TalentListPage";
import ClientList from "./components/ClientList/ClientList";
import TalentforTalent from "./pages/TalentforTalent";
import Login from "./components/Login";
import Home from "./components/Home";

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
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/login" component={Login} />
          <Route
            exact={true}
            path="/admin/talent-create"
            component={() => <CreateNewTalent getId={this.getId} />}
          />
          <Route
            exact={true}
            path="/admin/talent/:id"
            component={props => <TalentforAdmin match={props.match} />}
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
