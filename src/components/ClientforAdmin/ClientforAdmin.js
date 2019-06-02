import React from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import HeaderAdmin from "../HeaderAdmin";

/* Page to see client details, talents for client and add users */

class ClientforAdmin extends React.Component {
  state = {
    /* client */
    logo: null,
    rating: Number,
    name: String,
    field: String,
    size: String,
    email: String,
    numberOfUser: Number,
    recruited: Number,

    /* talent */
    informations: {
      photo: String,
      firstName: String,
      lastName: String,
      linkedIn: String,
      email: String,
      phoneNumber: String,
      salary: String,
      actualCompany: String,
      wantedSector: [String],
      wantedSize: String,
      actualTitle: String,
      wantedTitle: [String],
      status: String
    },
    description: {
      idealCompany: String,
      idealRole: String,
      workingEnvironment: String,
      development: String
    }
  };

  /* Function to save logo */

  handleFiles = files => {
    const logo64 = files.base64;
    this.setState({
      logo: logo64
    });
  };
  render() {
    return (
      <div>
        <div /* container for the grey area */>
          <HeaderAdmin />
          <div className="client-details">
            <div className="client-details-top">
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={false}
                handleFiles={this.handleFiles}
              >
                {this.state.logo !== null ? (
                  <span className="talent-picture-container">
                    <img
                      className="talent-picture"
                      src={this.state.logo}
                      alt="logo of client"
                    />
                  </span>
                ) : (
                  <div className="empty-photo">
                    <div className="text-empty-picture">
                      Cliquez pour ajouter un logo
                    </div>
                  </div>
                )}
              </ReactFileReader>
              <div className="client-name-sector">
                {/* Id à récupérer dans URL */}
                <div>Client name</div>
                <div>Client rating</div>
                <div>Client sector</div>
                <div>Client size/div></div>
              </div>
              <div className="client-details-search-talent" />
              {/* installer un composant champ de recherche */}
              <div className="client-details-talent-list">
                <div className="en--tete">
                  <div>Talent</div>
                  <div>Etat</div>
                  <div>Note</div>
                </div>
                <div className="talent-contenu">
                  {/* importer tous les talents et faire un tri pour récupérer dans un tableau seulement ceux qui sont intéressés par le secteur et la taille du client*/}
                  <div>Liste des talents</div>
                  <div>Etat</div>
                  {/* A remplir à la main au début, si on a le temps de faire messagerie, lié à messagerie */}
                  <div>Note</div>
                </div>
              </div>
            </div>
            <div className="client-users">world</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientforAdmin;
