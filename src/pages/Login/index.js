import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import style from "./index.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    wrong: false
  };

  setEmail = e => {
    this.setState({ email: e.target.value });
  };

  setPassword = e => {
    this.setState({ password: e.target.value });
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
        id: response.data.id
      });
      this.props.onLogIn({
        token: response.data.token,
        permission: response.data.permission,
        id: response.data.id
      });
      this.setState({ wrong: false });
    } catch (error) {
      this.setState({ wrong: true, password: "" });
    }
  };

  render() {
    return (
      <div>
        <div className="login-container">
          <div className="login-img">
            <img
              src={require("../../features/img/loginbackground.png")}
              alt="login-image"
            />
          </div>
          <div className="style.input-container">
            <h3 className="login-h3">Just log you in</h3>
            <input
              name="email"
              value={this.state.email}
              onChange={this.setEmail}
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.setPassword}
              placeholder="Password"
            />
            {this.state.wrong && <div>Wrong email / password</div>}
            <div onClick={this.login} className="button">
              Start your journey
            </div>
            <div className="redirect">
              Not in the Ernest community yet? Join us
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
