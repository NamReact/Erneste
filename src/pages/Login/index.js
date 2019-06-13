import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./index.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    key: "",
    wrong: false,
    showPassword: false,
    login: false
  };

  setEmail = e => {
    this.setState({ email: e.target.value });
  };

  setPassword = e => {
    this.setState({ password: e.target.value });
  };

  setKey = e => {
    this.setState({ key: e.target.value });
  };

  setLogin = () => {
    this.setState({ login: !this.state.login });
  };

  showPassword = () => {
    this.setState({ showPassword: true });
  };

  hidePassword = () => {
    this.setState({ showPassword: false });
  };

  login = async () => {
    try {
      const response = await axios.post(
        "https://ernest-server.herokuapp.com/login",
        {
          email: this.state.email,
          password: this.state.password
        }
      );
      Cookies.set("erneste", {
        token: response.data.token,
        permission: response.data.permission,
        id: response.data.id,
        profile: response.data.profile
      });
      this.props.onLogIn({
        token: response.data.token,
        permission: response.data.permission,
        id: response.data.id,
        profile: response.data.profile
      });
      this.setState({ wrong: false });
    } catch (error) {
      this.setState({ wrong: true, password: "" });
    }
  };

  clientLogin = async () => {
    try {
      const response = await axios.post(
        "https://ernest-server.herokuapp.com/login/client",
        {
          email: this.state.email,
          password: this.state.password,
          key: this.state.key
        }
      );
      Cookies.set("erneste", {
        token: response.data.token,
        permission: response.data.permission,
        id: response.data.id,
        clientId: response.data.clientId,
        email: response.data.email
      });
      this.props.onLogIn({
        token: response.data.token,
        permission: response.data.permission,
        id: response.data.id,
        clientId: response.data.clientId
      });
      this.setState({ wrong: false });
    } catch (error) {
      this.setState({ wrong: true, password: "" });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-client-login" onClick={this.setLogin}>
          {this.state.login ? "Connexion Talent" : "Connexion RH"}
        </div>
        <div className="login-img">
          <div className="login-left-side">
            <div className="login-circle" />
            <img
              className="login-logo"
              src={require("../../features/img/logo.svg")}
              alt="ernest-logo"
            />
            <div className="login-special-title">
              Soyez le <span>héros</span> de votre carrière
              <div>Erneste donne vie à vos ambitions de carrière.</div>
            </div>
          </div>
        </div>

        <div className="login-input-container">
          <h3 className="login-h3">Connectez vous</h3>
          <input
            name="email"
            className="login-input"
            value={this.state.email}
            onChange={this.setEmail}
            placeholder="Votre email"
          />
          {this.state.login && (
            <input
              name="key"
              className="login-input"
              value={this.state.key}
              onChange={this.setKey}
              placeholder="Clé d'activation"
            />
          )}
          <div className="login-password-container">
            <input
              name="password"
              type={this.state.showPassword ? "text" : "password"}
              className="login-input"
              value={this.state.password}
              onChange={this.setPassword}
              placeholder="Mot de passe"
            />
            <span
              className="login-password-eye"
              onMouseDown={this.showPassword}
              onMouseUp={this.hidePassword}
            >
              <img src={require("../../features/icons/oeil.svg")} />
            </span>
          </div>

          {this.state.wrong && <div>Mauvais email ou mot de passe</div>}
          <div
            onClick={this.state.login ? this.clientLogin : this.login}
            className="login-button"
          >
            C'est parti !
          </div>
          <Link to="/forgotten-password">
            <div className="login-redirect">
              Mot de passe oublié? <div>Cliquez ici</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
