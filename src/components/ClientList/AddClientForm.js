import React from "react";
import axios from "axios";

import "./AddClientForm.css";

class AddClientForm extends React.Component {
  state = {
    entreprise: "",
    secteur: "",
    secteurId: "",
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
  // setSector = event => {
  //   const value = event.target.value;
  //   // console.log(id);
  //   // const sectorArray = this.state.secteur;
  //   // sectorArray.push(this.state.sectorList[id].name);
  //   this.setState({
  //     secteur: value,
  //     sectorSelect: false
  //   });
  //   console.log("le secteur :");
  //   console.log(this.state.secteur);
  // };
  /* Function to handle company size */

  handleSize = e => {
    const id = e.target.id;
    console.log(id);
    this.setState({ taille: id, sizeSelect: false });
  };

  // fonction pour valider le formulaire en envoyant les params en requette post
  // et un message (d'erreur ou validé) à la soumission du formulaire
  handleSubmit = async event => {
    if (this.state.addNewSectorDiv && this.state.addNewSector !== "") {
      const response = await axios.post(
        "https://ernest-server.herokuapp.com/sector/create",
        { name: this.state.addNewSector },
        {
          headers: {
            authorization: "Bearer GFhOYeUPB2CA6TKZ"
          }
        }
      );

      await this.setState({
        secteurId:
          response.data[
            response.data
              .map(e => {
                return e.name;
              })
              .indexOf(this.state.addNewSector)
          ]._id
      });
    }
    await axios.post(
      "https://ernest-server.herokuapp.com/client/create",

      {
        name: this.state.entreprise,
        field: this.state.secteurId,
        size: this.state.taille,
        email: this.state.email
      },
      {
        headers: {
          authorization: "Bearer GFhOYeUPB2CA6TKZ"
        }
      }
    );
    this.props.closePopup();
    return this.setState({ valid: true });
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

    // const sectorArray = this.state.sectorList.map((item, index) => {
    //   return (
    //     <div id={index} key={item._id} onClick={this.setSector}>
    //       {item.name}
    //     </div>
    //   );
    // });

    return (
      <div className="popup-new-client">
        <div className="addClientFormContainer">
          {/* Header */}
          <div className="formHeader">
            <h4>Ajouter un nouveau client</h4>

            <button className="closingButton" onClick={this.props.closePopup}>
              <i className="fas fa-times" />
            </button>
          </div>

          <div className="formContainer">
            <div>
              <label className="addclient-form-label"> Entreprise</label>
              <input
                className="addclient-form-input"
                value={this.state.entreprise}
                onChange={this.handleChange}
                type="text"
                name="entreprise"
                id="name"
                required
              />
            </div>
            <div className="addclient-form-whole-sector">
              <div clasName="addclient-sector-big">
                {/* liste des secteurs */}
                <div className="sector-container">
                  <label className="addclient-form-label"> Secteur</label>
                  {/* <div className="sector-select" onClick={this.sectorSelect} /> */}
                  <div className="sector-select" onClick={this.sectorSelect}>
                    {this.state.secteur ? this.state.secteur : "Select secteur"}
                  </div>
                  {this.state.sectorSelect && (
                    <div id={this.state.secteur}>
                      {this.state.sectorList.map(item => {
                        return (
                          <div
                            id={item.name}
                            key={item._id}
                            className="sector-item-array"
                            onClick={e => {
                              this.setState(
                                { secteur: item.name, secteurId: item._id },
                                () => {
                                  console.log(
                                    this.state.secteur,
                                    this.state.secteurId
                                  );
                                }
                              );
                            }}
                          >
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                  )
                  //  : (
                  //   false
                  // )
                  }
                </div>

                {/* <select
                value={this.state.secteur}
                onChange={this.setSector}
                type="text"
                name="secteur"
                id="secteur"
                required
              > */}
                {/* {this.state.sectorList.map((sector, id) => {
                  return (
                    <option id={sector._id} key={sector._id} value={sector._id}>
                      {sector.name}
                    </option>
                  );
                })}
              </select> */}

                {/* Proposition : fenêtre d'ajout d'un nouveau secteur en mode apparition */}
                <div className="addnewsector" onClick={this.ShowNewSector}>
                  <button className="button-new-sector">
                    <i className="fas fa-plus" />
                  </button>
                  <div className="addsector-p">
                    <p>Ajouter un secteur</p>
                  </div>
                </div>
              </div>

              {this.state.addNewSectorDiv === true ? (
                <div className="addclient-new-sector-container">
                  <label className="addclient-form-label">
                    Ajout d'un nouveau secteur{" "}
                  </label>
                  <input
                    className="addclient-form-input"
                    name="addNewSector"
                    value={this.state.addNewSector}
                    onChange={this.handleChange}
                    type="texte"
                    id="texte"
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
              <div className="addclient-container-email">
                {/* Taille entreprise */}
                <label className="addclient-form-label">
                  Email du référent{" "}
                </label>
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="addclient-form-input"
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
