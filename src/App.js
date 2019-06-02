import React from "react";
/* import axios from "axios"; */
/* import ReactFileReader from "react-file-reader"; */
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import TalentforAdmin from "./components/TalentforAdmin";
import CreateNewTalent from "./components/CreateNewTalent";
import TalentListPage from "./components/TalentList/TalentListPage";
import ClientList from "./components/ClientList/ClientList";
import TalentforTalent from "./pages/TalentforTalent";
import Login from "./components/Login";
import Home from "./components/Home";
import ClientforAdmin from "./components/ClientforAdmin/ClientforAdmin";
import Cookies from "js-cookie";

class App extends React.Component {
  constructor(props) {
    super(props);
    // Get the token and permission from the cookies
    const token = Cookies.get("erneste-token");
    const permission = Cookies.get("erneste-permission");
    const id = Cookies.get("erneste-id");
    const userData = {
      token: token,
      permission: permission,
      id: id
    };
    this.state = {
      userData: userData === undefined ? null : userData
      /* mettre dans le state un token qui permet d'identifeir qui consulte la fiche, qui peut modifier quoi*/
    };

    this.handleClickLogOut = () => {
      console.log("hello");
      this.setState({ userData: null });
      Cookies.remove("erneste-token");
      Cookies.remove("erneste-permission");
      Cookies.remove("erneste-id");
    };
  }
  /* getId = id => {
    this.setState({ id: id });
  }; */

  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route
            exact={true}
            path="/login"
            render={props => {
              if (this.state.userData) {
                if (this.state.userData.permission === "Admin") {
                  const adminLink = `/admin/talent-list`;
                  return <Redirect to={adminLink} />;
                }
                if (this.state.userData.permission === "Talent") {
                  const talentLink = `/talent/${this.state.userData.id}`;
                  return <Redirect to={talentLink} />;
                }

                if (this.state.userData.permission === "Client") {
                  const clientLink = `/client/${this.state.userData.id}`;
                  return <Redirect to={clientLink} />;
                }
              }
              return (
                <Login
                  onLogIn={toto => {
                    this.setState({ userData: toto });
                  }}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/admin/talent-create"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/login"} />;
              }
              return (
                <CreateNewTalent
                  getId={this.getId}
                  handleClickLogOut={this.handleClickLogOut}
                  permission={this.state.userData.permission}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/admin/talent/:id"
            component={props => {
              if (!this.state.userData) {
                return <Redirect to={"/login"} />;
              }
              return (
                <TalentforAdmin
                  match={props.match}
                  handleClickLogOut={this.handleClickLogOut}
                  permission={this.state.userData.permission}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/talent/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/login"} />;
              }
              return (
                <TalentforTalent
                  match={props.match}
                  handleClickLogOut={this.handleClickLogOut}
                  permission={this.state.userData.permission}
                />
              );
            }}
          />
          <Route
            path="/admin/talent-list"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/login"} />;
              }
              return (
                <TalentListPage
                  handleClickLogOut={this.handleClickLogOut}
                  permission={this.state.userData.permission}
                />
              );
            }}
          />
          <Route
            path="/admin/client-list"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/login"} />;
              }
              return (
                <ClientList
                  match={props.match}
                  handleClickLogOut={this.handleClickLogOut}
                  permission={this.state.userData.permission}
                />
              );
            }}
          />
          <Route
            path="/admin/client/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/login"} />;
              }
              return (
                <ClientforAdmin
                  match={props.match}
                  handleClickLogOut={this.handleClickLogOut}
                  permission={this.state.userData.permission}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
