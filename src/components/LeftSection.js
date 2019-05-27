import React from "./node_modules/react";

class LeftSection extends React.Component {
  render() {
    return (
      <div style={{ width: "15%" }}>
        <img
          src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=50"
          alt="portrait of talent"
        />
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="Full Name"
            value={this.state.name}
            placeholder="Prénom NOM"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <input
            name="LinkedIn Profil"
            value={this.state.linkedIn}
            placeholder="Profil LinkedIn"
            onChange={e => {
              this.setState({ linkedIn: e.target.value });
            }}
          />
          <input
            name="email"
            value={this.state.email}
            placeholder="adresse@email.com"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <input
            name="phone number"
            value={this.state.phone}
            placeholder="0XXXXXXX"
            onChange={e => {
              this.setState({ phone: e.target.value });
            }}
          />
          <input
            name="Wage"
            value={this.state.wage}
            placeholder="$$$$$$$$"
            onChange={e => {
              this.setState({ wage: e.target.value });
            }}
          />
          <input
            name="Current company"
            value={this.state.curCompany}
            placeholder="Entreprise actuelle"
            onChange={e => {
              this.setState({ curCompany: e.target.value });
            }}
          />
          <input
            name="Desired sector"
            value={this.state.sector}
            placeholder="Secteur Souhaité"
            onChange={e => {
              this.setState({ sector: e.target.value });
            }}
          />
          <input
            name="Current position"
            value={this.state.curPosition}
            placeholder="Fonction actuelle"
            onChange={e => {
              this.setState({ curPosition: e.target.value });
            }}
          />
          <input
            name="Desired Position"
            value={this.state.desPosition}
            placeholder="Position souhaitée"
            onChange={e => {
              this.setState({ desPosition: e.target.value });
            }}
          />
        </form>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            onClick={() => {
              this.setState({ availability: 1 });
            }}
            style={{
              width: 10,
              height: 10,
              border: 1,
              borderStyle: "solid",
              borderRadius: 5,
              borderColor: "grey",

              backgroundColor: this.state.availability === 1 ? "red" : "white",
              marginRight: 10
            }}
          />
          <div
            onClick={() => {
              this.setState({ availability: 2 });
            }}
            style={{
              width: 10,
              height: 10,
              backgroundColor: this.state.availability === 2 ? "blue" : "white",
              marginRight: 10,
              border: 1,
              borderStyle: "solid",
              borderRadius: 5,
              borderColor: "grey"
            }}
          />
          <div
            onClick={() => {
              this.setState({ availability: 3 });
            }}
            style={{
              width: 10,
              height: 10,
              backgroundColor:
                this.state.availability === 3 ? "black" : "white",
              marginRight: 10,
              border: 1,
              borderStyle: "solid",
              borderRadius: 5,
              borderColor: "grey"
            }}
          />
          <div
            onClick={() => {
              this.setState({ availability: 4 });
            }}
            style={{
              width: 10,
              height: 10,
              backgroundColor:
                this.state.availability === 4 ? "green" : "white",
              marginRight: 10,
              border: 1,
              borderStyle: "solid",
              borderRadius: 5,
              borderColor: "grey"
            }}
          />
        </div>
      </div>
    );
  }
}

export default LeftSection;
