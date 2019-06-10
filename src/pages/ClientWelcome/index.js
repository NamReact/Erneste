import React from "react";
import axios from "axios";
import "./index.css";
import box from "../../features/icons/check_24px.svg";
import checkedbox from "../../features/icons/check_24px copy.svg";
import ReactFileReader from "react-file-reader";
import { Link } from "react-router-dom";

class ClientWelcome extends React.Component {
  state = {
    isLoading: true,
    titleList: ["Nom", "Fonction", "Entreprise", "Intéressé(e) par"],
    clientData: null,
    talentList: null,
    talentShownData: null,
    hoverContact: false
  };

  getTalentList = async () => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/",
      {
        headers: { authorization: `Bearer ${this.props.token}` }
      }
    );
    this.setState({ talentList: response.data });
    this.setState({ isLoading: false });
  };

  getClientData = async () => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/client/" +
        this.props.match.params.id,
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    this.setState({ clientData: response.data });
    this.setState({ isLoading: false });
  };

  // Function that displays the list of selected Talent

  displayTitle = titleList => {
    return (
      <ul>
        <li className="client-welcome-leftBlock-talentBlock-list-talent-checkBox">
          <img
            className="client-welcome-leftblock-box"
            src={box}
            alt="box cochée"
          />
        </li>
        {titleList.map(element => {
          let columnClass = "";
          if (titleList.indexOf(element) === 0) {
            columnClass =
              "client-welcome-leftBlock-talentBlock-list-talent-name";
          }
          if (titleList.indexOf(element) === 1) {
            columnClass =
              "client-welcome-leftBlock-talentBlock-list-talent-actualTitle";
          }
          if (titleList.indexOf(element) === 2) {
            columnClass =
              "client-welcome-leftBlock-talentBlock-list-talent-actualCompany";
          }
          if (titleList.indexOf(element) === 3) {
            columnClass =
              "client-welcome-leftBlock-talentBlock-list-talent-interestedBy";
          }
          return (
            <li className={columnClass}>
              {element}
              <i className="fas fa-sort-down" />
            </li>
          );
        })}
      </ul>
    );
  };

  displayTalent = selectedTalentList => {
    return selectedTalentList.map(element => {
      let statusClass = "";
      // Get the status
      if (element.informations.status === "0") {
        statusClass = "client-welcome-statut0";
      }
      if (element.informations.status === "Recherche active") {
        statusClass = "client-welcome-statut1";
      }
      if (element.informations.status === "Ouvert(e) aux opportunités") {
        statusClass = "client-welcome-statut2";
      }
      if (element.informations.status === "Ne pas être contacté(e)") {
        statusClass = "client-welcome-statut3";
      }
      if (element.informations.status === "Embauché(e) par Erneste") {
        statusClass = "client-welcome-statut4";
      }
      return (
        <ul>
          <li className="client-welcome-leftBlock-talentBlock-list-talent-checkBox">
            <img
              className="client-welcome-leftblock-box"
              src={box}
              alt="box cochée"
            />
          </li>
          <li
            onClick={() => {
              this.handleTalentClick(element);
            }}
            className="client-welcome-leftBlock-talentBlock-list-talent-name"
            key={element}
          >
            <div className={statusClass} />
            {`${element.informations.firstName} ${
              element.informations.lastName
            }`}
          </li>
          <li className="client-welcome-leftBlock-talentBlock-list-talent-actualTitle">
            {element.informations.actualTitle}
          </li>
          <li className="client-welcome-leftBlock-talentBlock-list-talent-actualCompany">
            {element.informations.actualCompany}
          </li>
          <li className="client-welcome-leftBlock-talentBlock-list-talent-interestedBy">
            {this.state.clientData.name}
          </li>
        </ul>
      );
    });
  };

  handleTalentClick = element => {
    this.setState({ talentShownData: element });
  };

  hoverOn = () => {
    this.setState({ hoverContact: true });
  };

  hoverOff = () => {
    this.setState({ hoverContact: false });
  };
  render() {
    if (this.state.talentShownData) {
      console.log(this.state.talentShownData.informations.linkedIn);
    }
    /* Test of Loading... */

    if (this.state.isLoading === true) {
      return "En cours de chargement....";
    }

    // Filter TalentList to become an array of selectedTalent for this client
    let selectedTalent = [];
    let clientSize = this.state.clientData.size;
    let clientSector = this.state.clientData.field._id;

    if (this.state.clientData && this.state.talentList) {
      for (let i = 0; i < this.state.talentList.length; i++) {
        if (
          this.state.talentList[i].informations.wantedSize &&
          (this.state.talentList[i].informations.wantedSize === "Indifférent" ||
            this.state.talentList[i].informations.wantedSize === clientSize)
        ) {
          if (this.state.talentList[i].informations.wantedSector) {
            for (
              let j = 0;
              j < this.state.talentList[i].informations.wantedSector.length;
              j++
            ) {
              if (
                this.state.talentList[i].informations.wantedSector[j] ===
                clientSector
              ) {
                selectedTalent.push(this.state.talentList[i]);
              }
            }
          }
        }
      }
    }

    return (
      <div className="client-welcome-content">
        <div className="client-welcome-body-container">
          <div className="client-welcome-leftBlock">
            <div className="client-welcome-leftBlock-title">Accueil</div>
            <div className="client-welcome-leftBlock-talentBlock">
              <div className="client-welcome-leftBlock-talentBlock-title">
                Talents sélectionnés pour vous
              </div>
              <div className="client-welcome-leftBlock-talentBlock-searchLine">
                <div className="client-welcome-leftBlock-talentBlock-searchLine-searchBlock">
                  <i className="fas fa-search" />
                  <input placeholder="Rechercher un profil" />
                </div>
              </div>
              <div className="client-welcome-leftBlock-talentBlock-list">
                <div className="client-welcome-leftBlock-talentBlock-list-title">
                  {this.displayTitle(this.state.titleList)}
                </div>
                <div className="client-welcome-leftBlock-talentBlock-list-talent">
                  {this.displayTalent(selectedTalent)}
                </div>
              </div>
            </div>
          </div>
          <div className="client-welcome-rightBlock">
            {this.state.talentShownData && (
              <div>
                <div className="client-welcome-rightBlock-header">
                  <div className="client-welcome-rightBlock-header-left">
                    <div className="client-welcome-rightBlock-header-left-picture-block">
                      <ReactFileReader
                        fileTypes={[".png", ".jpg"]}
                        base64={true}
                        multipleFiles={false}
                      >
                        {this.state.talentShownData.informations.photo !==
                        null ? (
                          <img
                            className="client-welcome-rightBlock-header-left-picture-picture"
                            src={this.state.talentShownData.informations.photo}
                            alt="portrait of talent"
                          />
                        ) : (
                          <div className="empty-photo">
                            <div className="text-empty-picture" />
                          </div>
                        )}
                      </ReactFileReader>
                    </div>
                    <div className="client-welcome-rightBlock-header-left-comments">
                      <span className="client-welcome-rightBlock-header-left-comments-name">
                        {`${
                          this.state.talentShownData.informations.firstName
                        } ${this.state.talentShownData.informations.lastName}`}
                        <a
                          href={
                            this.state.talentShownData.informations.linkedIn
                          }
                          target="_blank"
                        >
                          <i className="fab fa-linkedin client-welcome-rightBlock-header-left-comments-linkedin" />
                        </a>
                      </span>
                      <span className="client-welcome-rightBlock-header-left-comments-features">
                        {this.state.talentShownData.informations.actualCompany}
                      </span>
                      <span className="client-welcome-rightBlock-header-left-comments-features">
                        € {this.state.talentShownData.informations.salary}
                      </span>
                    </div>
                  </div>
                  <div className="client-welcome-rightBlock-header-right">
                    <div className="client-welcome-rightBlock-header-right-arrows">
                      <div className="client-welcome-rightBlock-header-right-arrows-left">
                        <i class="fas fa-arrow-left" />
                      </div>
                      <div className="client-welcome-rightBlock-header-right-arrows-right">
                        <i class="fas fa-arrow-right" />
                      </div>
                    </div>
                    <div className="client-welcome-rightBlock-header-right-contact-block">
                      <div
                        onMouseEnter={this.hoverOn}
                        onMouseLeave={this.hoverOff}
                        className="client-welcome-rightBlock-header-right-contact-button"
                      >
                        Contacter
                      </div>
                      <div
                        className={
                          this.state.hoverContact
                            ? "test-display"
                            : "test-notDisplay"
                        }
                      >
                        <div className="arrow-upTest" />
                        <div className="textTest">
                          Contacter les talents via Erneste augmente vos chances
                          de réponse positives, car nous sommes un tiers de
                          confiance auquel se fie le talent.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="client-welcome-rightBlock-idealCompany">
                  <h3 className="client-welcome-rightBlock-title">
                    L'entreprise idéale
                  </h3>
                  <div className="client-welcome-rightBlock-text">
                    {this.state.talentShownData.description.idealCompany}
                  </div>
                </div>
                <div className="client-welcome-rightBlock-idealRole">
                  <h3 className="client-welcome-rightBlock-title">
                    Mon rôle idéal
                  </h3>
                  <div className="client-welcome-rightBlock-text">
                    {this.state.talentShownData.description.idealRole}
                  </div>
                </div>
                <div className="client-welcome-rightBlock-workingEnvironment">
                  <h3 className="client-welcome-rightBlock-title">
                    Mes conditions idéales
                  </h3>
                  <div className="client-welcome-rightBlock-text">
                    {this.state.talentShownData.description.workingEnvironment}
                  </div>
                </div>
                <div className="client-welcome-rightBlock-development">
                  <h3 className="client-welcome-rightBlock-title">
                    Mes ambitions d'évolution
                  </h3>
                  <div className="client-welcome-rightBlock-text">
                    {this.state.talentShownData.description.development}
                  </div>
                </div>
                <div className="client-welcome-rightBlock-skills">skills</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.props.setPageActive("client");
    this.getClientData();
    this.getTalentList();
  }
}

export default ClientWelcome;

/*


    // Array to display, display by column

    //Array of Status
    let statusArray = selectedTalent.map(element => {
      if (element.informations.status) {
        return element.informations.status;
      } else {
        return "Non mentionné";
      }
    });
    //Array of box
    let boxArray = selectedTalent.map(element => {
      return (
        <img
          className="client-welcome-leftblock-box"
          src={box}
          alt="box cochée"
        />
      );
    });

    // Array of Name
    let nameArray = selectedTalent.map(element => {
      return `${element.informations.firstName} ${
        element.informations.lastName
      }`;
    });
    // Array of actualFonction
    let actualFonctionArray = selectedTalent.map(element => {
      if (element.informations.actualCompany) {
        return element.informations.actualTitle;
      } else {
        return "Non mentionné";
      }
    });
    //Array of actualCompany
    let actualCompanyArray = selectedTalent.map(element => {
      if (element.informations.actualCompany) {
        return element.informations.actualCompany;
      } else {
        return "Non mentionné";
      }
    });

    // Array of Interested by
    let interestedByArray = Array(selectedTalent.length).fill(
      this.state.clientData.name
    );

    // Array that will be displayed in list
    let displayedArray = [
      statusArray,
      boxArray,
      nameArray,
      actualFonctionArray,
      actualCompanyArray,
      interestedByArray
    ];
    console.log(displayedArray);

    for (let i = 0; i < displayedArray.length; i++) {
      if (i === 0) {
        displayedArray[i].unshift(this.state.titleList[i]);
      } else if (i === 1) {
        displayedArray[i].unshift(
          <img
            className="client-welcome-leftblock-box"
            src={box}
            alt="box cochée"
          />
        );
      } else if (i > 1) {
        displayedArray[i].unshift(this.state.titleList[i - 1]);
      }
    }

    // Array=[[Nom, Elon Musk, John Tilda, etc...],[Fonction,...,...,..],....]




    displayList = toto => {
    let statusClass = "";

    for (let i = 1; i < toto.length; i++) {
      toto[i] = toto[i].map(element => {
        let position = toto[i].indexOf(element);
        // Box cases
        if (i === 1) {
          if (position === 0) {
            return (
              <li
                className="client-welcome-leftBlock-talentBlock-list-column-title"
                key={element}
              >
                {element}
              </li>
            );
          }
          return (
            <li
              key={element}
              className="client-welcome-leftBlock-talentBlock-list-column-element"
            >
              {element}
            </li>
          );
        }

        // Case Name
        else if (i === 2) {
          // Case titles
          if (position === 0) {
            return (
              <li
                className="client-welcome-leftBlock-talentBlock-list-column-title"
                key={element}
              >
                {element}
                <i className="fas fa-sort-down" />
              </li>
            );
          }
          // Get the status
          if (toto[0][position] === "0") {
            statusClass = "client-welcome-statut0";
          }
          if (toto[0][position] === "Recherche active") {
            statusClass = "client-welcome-statut1";
          }
          if (toto[0][position] === "Ouvert(e) aux opportunités") {
            statusClass = "client-welcome-statut2";
          }
          if (toto[0][position] === "Ne pas être contacté(e)") {
            statusClass = "client-welcome-statut3";
          }
          if (toto[0][position] === "Embauché(e) par Erneste") {
            statusClass = "client-welcome-statut4";
          }

          return (
            <li
              key={element}
              className="client-welcome-leftBlock-talentBlock-list-column-element"
            >
              <div className={statusClass} />
              {element}
            </li>
          );
        } else {
          // Other case
          // Case title
          if (position === 0) {
            return (
              <li
                className="client-welcome-leftBlock-talentBlock-list-column-title"
                key={element}
              >
                {element}
                <i className="fas fa-sort-down" />
              </li>
            );
          }
          return (
            <li
              key={element}
              className="client-welcome-leftBlock-talentBlock-list-column-element"
            >
              {element}
            </li>
          );
        }
      });
    }
    // Status column is removed because not displayed
    toto.splice(0, 1);
    // Map on the array we want to display
    return toto.map((element, index) => {
      return (
        <ul
          key={index}
          className="client-welcome-leftBlock-talentBlock-list-column"
        >
          {element}
        </ul>
      );
    });
  };
    */
