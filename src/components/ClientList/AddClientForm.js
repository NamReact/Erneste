import React from "react";
import axios from "axios";

import "./AddClientForm.css";

class AddClientForm extends React.Component {
  state = {
    entreprise: "",
    secteur: null,
    taille: "",
    email: "",
    sectorList: [],
    addNewSector: "",
    addNewSectorDiv: false,
    error: false,
    valide: false,
    isLoading: false
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
  // et un message d'erreur ou validé à la soumission du formulaire
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
      this.props.closePopup();
      return this.setState({ valid: true });
    }
  };
  ShowNewSector = x => {
    this.setState({
      addNewSectorDiv: !this.state.addNewSectorDiv
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return "Loading....";
    }
    return (
      <div>
        <div className="addClientFormContainer">
          <div className="formHeader">
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
                {/* liste des secteurs : en attente du selector */}
                <label for="Secteur"> Secteur</label>
                {/* <input
                  value={this.state.secteur}
                  onChange={this.handleChange}
                  type="text"
                  name="secteur"
                  id="name"
                  required
                /> */}
                <select
                  value={this.state.secteur}
                  onChange={this.handleChange}
                  type="text"
                  name="secteur"
                  id="secteur"
                  required
                >
                  {this.state.sectorList.map((sector, id) => {
                    return (
                      <option key={sector.id} value={sector.name}>
                        {sector.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div className="addnewtalent" onClick={this.ShowNewSector}>
                  <p>+</p> <p>nouveau secteur</p>
                </div>
                {this.state.addNewSectorDiv === true ? (
                  <div>
                    <label for="newsector">Ajout d'un nouveau secteur </label>
                    <input
                      value={this.state.addNewSector}
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      id="email"
                      required
                    />
                  </div>
                ) : (
                  this.state.addNewSectorDiv
                )}
              </div>
              <div>
                <label for="Secteur"> Taille</label>
                <select
                  value={this.state.taille}
                  onChange={this.handleChange}
                  type="text"
                  name="taille"
                  id="taille"
                  required
                >
                  <option value="">--choisir la taille--</option>
                  <option value="Grande">Grande</option>
                  <option value="Petite">Petite</option>
                </select>
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
              <div className="submitButtons">
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
  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/sector/"
    );
    this.setState({
      isLoading: false,
      sectorList: response.data
    });
  }
}

export default AddClientForm;
