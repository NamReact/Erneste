import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
      Cookies.set("ernest", {
        token: response.data.token,
        permission: response.data.permission
      });
      this.setState({ wrong: false });
    } catch (error) {
      this.setState({ wrong: true, password: "" });
    }
  };

  render() {
    return (
      <div>
        <div>
          <form>
            <input
              name="email"
              value={this.state.email}
              onChange={this.setEmail}
              placeholder="email"
            />
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.setPassword}
              placeholder="password"
            />
            {this.state.wrong && <div>Wrong email / password</div>}
          </form>
          <div onClick={this.login}>Connect</div>
        </div>
      </div>
    );
  }
}

export default Login;
