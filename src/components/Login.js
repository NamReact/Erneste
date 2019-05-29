import React from "react";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  setEmail = e => {
    this.setState({ email: e.target.value });
  };

  setPassword = e => {
    this.setState({ password: e.target.value });
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
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
