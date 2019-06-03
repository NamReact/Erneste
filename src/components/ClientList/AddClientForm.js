import React from "react";
import axios from "axios";

import "./AddClientForm.css";

class AddClientForm extends React.Component {
  state = {
    entreprise: "",
    secteur: [],
    taille: null,
    email: "",
    sectorList: [],
    sectorSelect: false,
    sizeSelect: false,
    addNewSector: "",
    addNewSectorDiv: false,
    error: false,
    valid: false,
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

  // fonction apparation gestion select secteur
  sectorSelect = () => {
    this.setState({ sectorSelect: !this.state.sectorSelect });
  };
  // fonction apparation gestion select Taille
  sizeSelect = () => {
    this.setState({ sizeSelect: !this.state.sizeSelect });
  };

  // fonction pour gérer secteur
  setSector = event => {
    const id = event.target.id;
    console.log(id);
    const sectorArray = this.state.secteur;
    sectorArray.push(this.state.sectorList[id]);
    this.sectorSelect();
    this.setState({ secteur: sectorArray });
    console.log(this.state.secteur);
  };
  /* Function to handle company size */

  handleSize = e => {
    const id = e.target.id;
    console.log(id);
    this.setState({ taille: id, sizeSelect: false });
  };

  // fonction pour valider le formulaire en envoyant les params en requette post
  // et un message (d'erreur ou validé) à la soumission du formulaire
  handleSubmit = async event => {
    if (
      this.state.entreprise === " " ||
      this.state.secteur === " " ||
      this.state.taille === " "
    ) {
      return this.setState({ error: true });
    } else {
      const field = this.state.secteur[0]._id;
      console.log(this.state.taille);
      const response = await axios.post(
        "https://ernest-server.herokuapp.com/client/create",

        {
          name: this.state.entreprise,
          field: field,
          size: this.state.taille,
          email: this.state.mail
        },
        {
          headers: {
            authorization: "Bearer GFhOYeUPB2CA6TKZ"
          }
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

    const sectorArray = this.state.sectorList.map((item, index) => {
      return (
        <div id={index} key={item._id} onClick={this.setSector}>
          {item.name}
        </div>
      );
    });

    return (
      <div>
        <div className="addClientFormContainer">
          <div className="formHeader">
            <p>Ajouter un nouveau client</p>

            <button className="closingButton" onClick={this.props.closePopup}>
              <i class="fas fa-times" />
            </button>
          </div>

          <div className="formContainer">
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
              {/* liste des secteurs */}
              <div className="sector-container">
                <label for="Secteur"> Secteur</label>
                {this.state.secteur.map(sector => {
                  return (
                    <div key={sector._id} className="sector-item-array">
                      {sector.name}
                    </div>
                  );
                })}
                <div className="sector-select" onClick={this.sectorSelect}>
                  Choisir secteur
                </div>
                {this.state.sectorSelect ? (
                  <div>
                    {this.state.sectorList.map((item, index) => {
                      return (
                        <div id={index} key={item._id} onClick={this.setSector}>
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  false
                )}
              </div>

              {/* <select
                  value={this.state.secteur}
                  onChange={this.setSector}
                  type="text"
                  name="secteur"
                  id="secteur"
                  required
                >
                  {this.state.sectorList.map((sector, id) => {
                    return (
                      <option
                        id={sector._id}
                        key={sector._id}
                        value={sector._id}
                      >
                        {sector.name}
                      </option>
                    );
                  })}
                </select> */}
              {/* Proposition : fenêtre d'ajout d'un nouveau secteur en mode apparition */}
              <div className="addnewsector" onClick={this.ShowNewSector}>
                <p>
                  <i class="fas fa-plus" />
                </p>{" "}
                <p>nouveau secteur</p>
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

            {/* Taille de l'entreprise */}
            <div className="size-container">
              <div>Taille</div>
              <div className="size-button" onClick={this.sizeSelect}>
                {this.state.taille ? this.state.taille : "Select size"}
              </div>
              {this.state.sizeSelect && (
                <div className="size-select">
                  <div onClick={this.handleSize} id="Petite">
                    Petite
                  </div>
                  <div onClick={this.handleSize} id="Grande">
                    Grande
                  </div>
                </div>
              )}
            </div>

            <div>
              <div>
                {/* Taille entreprise */}
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
                <button onClick={this.props.closePopup} className="annuler">
                  Annuler
                </button>
                <button onClick={this.handleSubmit} className="ajouter">
                  Ajouter
                </button>
              </div>
            </div>

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
      "https://ernest-server.herokuapp.com/sector/",
      { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({
      isLoading: false,
      sectorList: response.data
    });
  }
}

export default AddClientForm;
