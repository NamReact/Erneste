import React from "react";
/* import axios from "axios"; */
/* import ReactFileReader from "react-file-reader"; */
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import TalentforAdmin from "./pages/TalentforAdmin";
import CreateNewTalent from "./pages/CreateNewTalent";
import TalentListPage from "./components/TalentList/TalentListPage";
import ClientList from "./components/ClientList/ClientList";
import TalentforTalent from "./pages/TalentPage/TalentforTalent";
import Login from "../src/pages/Login";
import ClientforAdmin from "./pages/ClientForAdmin/index";
import Cookies from "js-cookie";
import HeaderAdmin from "./components/HeaderAdmin";
import Admin from "./pages/Admin";
import ClientWelcome from "./pages/ClientWelcome";
import ClientMail from "./pages/ClientMail";
import ResetPassword from "./pages/ResetPassword";
import ForgottenPassword from "./pages/ForgottenPassword";
import TalentOpportunities from "./pages/TalentOpportunities";

class App extends React.Component {
  constructor(props) {
    super(props);
    // Get the token and permission from the cookies
    const userData = Cookies.getJSON("erneste");

    this.state = {
      userData: null || userData,
      pageActive: null
      /* mettre dans le state un token qui permet d'identifeir qui consulte la fiche, qui peut modifier quoi*/
    };

    this.handleClickLogOut = () => {
      this.setState({ userData: null });
      Cookies.remove("erneste");
    };

    this.setPageActive = toto => {
      this.setState({ pageActive: toto });
    };
  }

  render() {
    return (
      <Router>
        {this.state.userData && (
          <HeaderAdmin
            pageType={this.state.pageActive}
            /* userID is the talent's profile page ID / user ID id the client's profile page ID */
            userID={this.state.userData.profile}
            handleClickLogOut={this.handleClickLogOut}
          />
        )}
        <Switch>
          <Route
            exact={true}
            path="/"
            render={props => {
              if (this.state.userData) {
                if (this.state.userData.permission === "Admin") {
                  const adminLink = `/admin/talent-list`;
                  return <Redirect to={adminLink} />;
                }
                if (this.state.userData.permission === "Talent") {
                  const talentLink = `/talent/${this.state.userData.profile}`;
                  return <Redirect to={talentLink} />;
                }

                if (this.state.userData.permission === "Client") {
                  const clientLink = `/client/${this.state.userData.idCompany}`;
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
          {/* ------ ADMIN ROADS ------ */}
          <Route
            exact={true}
            path="/admin/talent-create"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <CreateNewTalent
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/admin/talent/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <TalentforAdmin
                  match={props.match}
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          <Route
            path="/admin/talent-list"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <TalentListPage
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          <Route
            path="/admin/client-list"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <ClientList
                  match={props.match}
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          <Route
            path="/admin/client/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <ClientforAdmin
                  match={props.match}
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          <Route
            path="/admin/config/"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <Admin
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          {/* ------TALENT ROADS ----- */}
          <Route
            exact={true}
            path="/talent/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <TalentforTalent
                  match={props.match}
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/talent/opportunities/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <TalentOpportunities
                  match={props.match}
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          {/* ------CLIENT ROADS ----- */}
          <Route
            exact={true}
            path="/client/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <ClientWelcome
                  match={props.match}
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                  userMail={this.state.userData.email}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/client/mail/:id"
            render={props => {
              if (!this.state.userData) {
                return <Redirect to={"/"} />;
              }
              return (
                <ClientMail
                  match={props.match}
                  permission={this.state.userData.permission}
                  setPageActive={this.setPageActive}
                  token={this.state.userData.token}
                />
              );
            }}
          />
          <Route
            exact={true}
            path="/reset-password/:token"
            render={props => {
              return <ResetPassword match={props.match} />;
            }}
          />
          <Route
            exact={true}
            path="/forgotten-password"
            component={ForgottenPassword}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
