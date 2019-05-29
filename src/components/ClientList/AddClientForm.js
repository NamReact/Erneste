import React from "react";
import axios from "axios";

import "./AddClientForm.css";

class AddClientForm extends React.Component {
  state = {
    entreprise: "",
    secteur: "",
    taille: "",
    email: "",
    error: false,
    valide: false
  };
  // fonction pour changer les states des inputs
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const statesToUpdate = {};
    statesToUpdate[name] = value;
    this.setState(statesToUpdate);
  };

  // fonction pour valider le formulaire en envoyant les params en requette post
  handleSubmit = async event => {
    event.preventDefault();
    if (
      this.state.entreprise === " " ||
      this.state.secteur === " " ||
      this.state.taille === " "
    ) {
      return this.setState({ error: true });
    } else {
      const response = await axios.post(
        "https://ernest-server.herokuapp.com/client/create",
        {
          name: this.state.entreprise,
          field: this.state.secteur,
          size: this.state.taille,
          email: this.state.mail
        }
      );
      return this.setState({ valid: true });
    }
  };
  render() {
    return (
      <div>
        <div className="addClientFormContainer">
          <div className="formheader">
            <p>Ajouter un nouveau client</p>
            <button className="closingButton" onClick={this.props.closePopup}>
              X
            </button>
          </div>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div>
                <label for="entreprise"> Entreprise</label>
                <input
                  value={this.state.entreprise}
                  onChange={this.handleChange}
                  type="text"
                  name="entreprise"
                  id="name"
                  required
                />
              </div>
              <div>
                <label for="Secteur"> Secteur</label>
                <input
                  value={this.state.secteur}
                  onChange={this.handleChange}
                  type="text"
                  name="secteur"
                  id="name"
                  required
                />
              </div>
              <div>
                <label for="Taille"> Taille</label>
                <input
                  value={this.state.taille}
                  onChange={this.handleChange}
                  type="text"
                  name="taille"
                  id="name"
                  required
                />
              </div>
              <div>
                <label for="email">Email du référent </label>
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="email"
                  required
                />
              </div>
              <div classeName="submitButtons">
                <button onClick={this.props.closePopup}>Annuler</button>
                <button type="submit">ajouter</button>
              </div>
            </form>
            {/* affichage de l'état de la validation du formulaire */}
            <div>
              {this.state.error === true ? <p>error</p> : this.state.error}
              {this.state.valid === true ? <p>validate</p> : this.state.valid}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddClientForm;
