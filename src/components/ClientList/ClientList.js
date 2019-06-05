import React from "react";
import axios from "axios";

import AddClientForm from "./AddClientForm";

import "./ClientList.css";

class ClientList extends React.Component {
  state = {
    clientListData: null,
    clientList: null,
    searchFilter: "",
    PopUpAddClient: false,
    FilterOnClick: null,
    isLoading: true,
    /* ----- State for the chevrons filter ----- */
    filterChoice: [
      "Note",
      "Entreprise",
      "Secteur",
      "Taille",
      "Comptes",
      "Recrutement"
    ],
    filterBoxShown: false,
    filterOrder: 0,
    ArrayOfFilteredClientList: [],
    chevronFilterChosen: [],
    /* ----- State for sort lists ----- */
    sortOrder: null,
    sortList: [],
    buttonDeleteFilter: false
  };
  handleChange = event => {
    const value = event.target.value;
    this.setState({ searchFilter: value });
  };

  togglePopup = () => {
    this.setState({
      PopUpAddClient: !this.state.PopUpAddClient
    });
  };

  /* ------ CHEVRONS FILTER METHODS ------ */

  /* ----- All Filter choice Display ----- */
  displayTitle = (toto, arrayOfList) => {
    return toto.map(element => {
      return this.title(element, arrayOfList);
    });
  };

  /* ----- One filterChoice display ----- */
  title = (filter, arrayOfList) => {
    let sortClass = "";
    if (filter === "Note") {
      if (
        this.state.sortList
          .map(e => {
            return e.title;
          })
          .indexOf(filter) !== -1
      ) {
        sortClass = "button-and-note clientList-titleSorted";
      }
      return (
        <li className={sortClass}>
          <button className="deleteAll" />
          <div>{filter}</div>
          <i
            className="fas fa-sort"
            onClick={() => {
              this.onChevronSortClick(filter);
            }}
          />
        </li>
      );
    } else if (
      filter === "Entreprise" ||
      filter === "Secteur" ||
      filter === "Taille"
    ) {
      if (
        this.state.chevronFilterChosen
          .map(e => {
            return e.title;
          })
          .indexOf(filter) !== -1
      ) {
        sortClass = "clientList-titleSorted";
      }
      return (
        <li className={sortClass}>
          {filter}
          <i
            className="fas fa-sort-down"
            onClick={() => {
              this.onChevronFilterClick(filter);
            }}
          />
          {this.state.filterBoxShown === filter &&
            this.chevronClickBox(filter, arrayOfList)}
        </li>
      );
    } else if (filter === "Comptes" || filter === "Recrutement") {
      if (
        this.state.sortList
          .map(e => {
            return e.title;
          })
          .indexOf(filter) !== -1
      ) {
        sortClass = "clientList-titleSorted";
      }
      return (
        <li className={sortClass}>
          {filter}
          <i
            className="fas fa-sort"
            onClick={() => {
              this.onChevronSortClick(filter);
            }}
          />
        </li>
      );
    }
  };

  /* ------ Function for list we want to filter ------ */
  onChevronFilterClick = async toto => {
    if (toto !== this.state.filterBoxShown) {
      await this.setState({ filterBoxShown: toto });
    } else {
      await this.setState({ filterBoxShown: null });
    }
  };

  /* ------ Function for list we want to sort ------ */
  onChevronSortClick = async toto => {
    let sortList = [...this.state.sortList];
    let position = sortList
      .map(e => {
        return e.title;
      })
      .indexOf(toto);
    // toto = "Name" , "Comptes", "Recrutement"
    if (position === -1) {
      sortList.push({ title: toto, order: "descending" });
    } else {
      if (sortList[position].order === "descending") {
        sortList[position].order = "ascending";
      } else if (sortList[position].order === "ascending") {
        sortList.splice(position, 1);
      }
    }
    await this.setState({ sortList: sortList });
  };

  /* ----- Box that appears/unappears when chevron clicked ----- */
  chevronClickBox = (toto, arrayOfList) => {
    return (
      <div className="clientList-chevronBox">
        {this.chevronBoxArray(toto, arrayOfList).map(element => {
          if (element) {
            let clicked = false;
            let titlePosition = this.state.chevronFilterChosen
              .map(e => {
                return e.title;
              })
              .indexOf(toto);
            if (titlePosition !== -1) {
              let elementPosition = this.state.chevronFilterChosen[
                titlePosition
              ].filter.indexOf(element);
              if (elementPosition !== -1) {
                clicked = true;
              }
            }
            return (
              <div className="clientList-chevronBox-element">
                <div
                  className={
                    clicked
                      ? "deleteOne testChecked"
                      : "deleteOne testUnchecked"
                  }
                  onClick={() => {
                    this.onClickChevronFilter(toto, element);
                  }}
                />
                {element}
              </div>
            );
          }
        })}
      </div>
    );
  };

  /* ----- Array displayed in box ----- */
  chevronBoxArray = (toto, arrayOfList) => {
    let chevronBoxArray = [];
    console.log(arrayOfList);
    console.log(this.state.chevronFilterChosen);

    // We look for the position of the filter type
    let position = this.state.chevronFilterChosen
      .map(e => {
        return e.title;
      })
      .indexOf(toto);

    let listOfReference = [];
    if (position === -1) {
      listOfReference = arrayOfList[arrayOfList.length - 1];
    } else {
      listOfReference = arrayOfList[position];
    }

    let filterListComplete = listOfReference.map(element => {
      return element[toto];
    });

    for (let i = 0; i < filterListComplete.length; i++) {
      if (typeof filterListComplete[i] !== "object") {
        if (chevronBoxArray.indexOf(filterListComplete[i]) === -1) {
          chevronBoxArray.push(filterListComplete[i]);
        }
      } else {
        for (let j = 0; j < filterListComplete[i].length; j++) {
          if (chevronBoxArray.indexOf(filterListComplete[i][j].name) === -1) {
            chevronBoxArray.push(filterListComplete[i][j].name);
          }
        }
      }
    }
    return chevronBoxArray;
  };

  onClickChevronFilter = async (filterTitle, filterChosen) => {
    let result = [...this.state.chevronFilterChosen];

    let chevronFilterChosenTitle = result.map(e => {
      return e.title;
    });
    let titlePosition = chevronFilterChosenTitle.indexOf(filterTitle);
    if (titlePosition === -1) {
      result.push({
        title: filterTitle,
        filter: [filterChosen]
      });
      chevronFilterChosenTitle.push(filterTitle);
    } else {
      let filterChosenPosition = result[titlePosition].filter.indexOf(
        filterChosen
      );
      if (filterChosenPosition === -1) {
        result[titlePosition].filter.push(filterChosen);
      } else {
        result[titlePosition].filter.splice(filterChosenPosition, 1);
        if (result[titlePosition].filter.length < 1) {
          result.splice(titlePosition, 1);
        }
      }
    }
    if (result.length > 0) {
      this.setState({ buttonDeleteFilter: true });
    } else {
      this.setState({ buttonDeleteFilter: false });
    }

    this.setState({ chevronFilterChosen: result });
    return;
  };

  renderStars(item) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < item.rating) {
        stars.push(<i class="fas fa-star" />);
      } else {
        stars.push(<i class="far fa-star" />);
      }
    }

    return (
      <div style={{ flexDirection: "row", alignItems: "center" }}>{stars}</div>
    );
  }

  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement ...</p>;
    }

    // ----------filtre-----------------

    /* copie des données pour filtre */

    let clientListArray = [...this.state.clientListData];

    /*  filtre "Taille" , "Entreprise" et "Secteur" */

    let result = clientListArray.filter(search => {
      return (
        search.Taille.toLowerCase().indexOf(
          this.state.searchFilter.toLowerCase()
        ) !== -1 ||
        search.Entreprise.toLowerCase().indexOf(
          this.state.searchFilter.toLowerCase()
        ) !== -1 ||
        search.Secteur[0].Entreprise.toLowerCase().indexOf(
          this.state.searchFilter.toLowerCase()
        ) !== -1
      );
    });

    // *------ SORT LIST ------* //
    if (this.state.filterOrder.length > 0) {
      for (let i = 0; i < this.state.sortList.length; i++) {
        let title = this.state.sortList[i].title;
        if (this.state.sortList[i].order === "ascending") {
          result = result
            .map(element => {
              return element.title;
            })
            .sort((a, b) => {
              return a - b;
            });
        } else if (this.state.sortList[i] === "descending") {
          result = result
            .map(element => {
              return element.title;
            })
            .sort((a, b) => {
              return b - a;
            });
        }
      }
    }

    // *------ Filtre le result avec les filtres
    // On crée un tableau qui stock les différentes listes filtrées
    // A la base il a la première liste filtrée par le research
    const ArrayOfFilteredClientList = [result];

    //1. On applique les filtres, et on enregistre la nouvelle liste filtrée à chaque fois
    if (this.state.chevronFilterChosen) {
      for (let i = 0; i < this.state.chevronFilterChosen.length; i++) {
        result = result.filter(element => {
          let bool = false;
          //cas Secteur
          if (this.state.chevronFilterChosen[i].title === "Secteur") {
            for (
              let j = 0;
              j < element[this.state.chevronFilterChosen[i].title].length;
              j++
            ) {
              for (
                let k = 0;
                k < this.state.chevronFilterChosen[i].filter.length;
                k++
              ) {
                if (
                  element[this.state.chevronFilterChosen[i].title][j].name ===
                  this.state.chevronFilterChosen[i].filter[k]
                ) {
                  bool = true;
                }
              }
            }
            return bool;
          } else {
            //cas normal
            for (
              let j = 0;
              j < this.state.chevronFilterChosen[i].filter.length;
              j++
            ) {
              if (
                element[this.state.chevronFilterChosen[i].title] ===
                this.state.chevronFilterChosen[i].filter[j]
              ) {
                bool = true;
              }
            }
            return bool;
          }
        });
        // On push la listefiltrée dans le tableau des listes filtrées
        ArrayOfFilteredClientList.push(result);
      }
    }

    return (
      <div className="content">
        {/* header  */}

        <div className="header-of-page" />
        {/* header---end  */}

        {/* title  page : Clients & view  */}

        <div className="titlePage">
          <p> Clients</p>
          <p className="number-of-clients"> Affichés : {result.length}</p>
        </div>
        {/* title  page : Clients & view---end */}
        <div className="frame">
          {/* Search bar & button--start */}
          <div className="boxSearchBarAndButton">
            {/* 1-Search bar */}
            <div className="all-searchbar">
              <div className="research">
                <div className="loupe">
                  <i className="fas fa-search" />
                </div>
                <input
                  type="search"
                  name="searchFilter"
                  placeholder="rechercher client, secteur, taille"
                  className="searchbar"
                  value={this.state.searchFilter}
                  onChange={this.handleChange}
                />
              </div>

              {/* 2-button */}
              <div className="all-button-add-client">
                <div>
                  <i className="fas fa-plus" />
                </div>
                <button onClick={this.togglePopup} className="addClientButton">
                  Ajouter un client
                </button>
              </div>
              {/* 3-Delete Filter */}
              <div className="deleteFilter">
                {this.state.buttonDeleteFilter ? (
                  <div className="clientList-deleteFilter">
                    Supprimer les filtres
                  </div>
                ) : null}
              </div>
            </div>

            {/* 2-1 page ajout client */}
            <div className="addClientPage">
              {this.state.PopUpAddClient ? (
                <AddClientForm
                  className="popUpWindow"
                  text="Close Me"
                  closePopup={this.togglePopup}
                />
              ) : null}
            </div>
          </div>

          {/* Search bar & button---end */}

          {/* Clientlist array fulllength box--start */}
          <div>
            {/* Clientlist array Entries--start */}
            <ul className="clientArrayEntries">
              {this.displayTitle(
                this.state.filterChoice,
                ArrayOfFilteredClientList
              )}
            </ul>
            {/* Clientlist array boxEntries--end */}

            {/* clientList array item*/}
            <div>
              <div>
                {result.map((client, id) => {
                  const Secteur = { ...client.Secteur };

                  return (
                    <ul key={client._id} className="clientListItem">
                      <li>
                        {/* <button className="deleteAll" /> */}
                        {/* {client.rating ? client.rating : "lol"} */}
                        {this.renderStars(client)}
                      </li>

                      <li>
                        <a href="#">{client.Entreprise}</a>
                      </li>
                      <li>{Secteur[0].name}</li>

                      <li>{client.Taille}</li>
                      <li>{client.numberOfUser ? client.numberOfUser : "0"}</li>
                      <li>{client.recruited ? client.recruited : "0"}</li>
                    </ul>
                  );
                })}
              </div>
            </div>
            {/* clientList array item---end*/}
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    this.props.setPageActive("admin/client");
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/client",
      { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
    );

    /* ----- On change le Name en Entreprise le field en Secteur le Size en Taille ----- */
    let responseCopie = [...response.data];
    const keys = Object.keys(response.data); // [ 'name', 'age' ]
    for (let i = 0; i < response.data.length; i++) {
      responseCopie[i].Entreprise = response.data[i].name;
      responseCopie[i].Secteur = response.data[i].field;
      responseCopie[i].Taille = response.data[i].size;
      responseCopie[i].Note = response.data[i].rating;
      responseCopie[i].Comptes = response.data[i].numberOfUser;
      responseCopie[i].Recrutement = response.data[i].recruited;
      delete responseCopie[i]["name"];
      delete responseCopie[i]["field"];
      delete responseCopie[i]["size"];
      delete responseCopie[i]["rating"];
      delete responseCopie[i]["numberOfUser"];
      delete responseCopie[i]["recruited"];
    }

    this.setState({
      clientListData: responseCopie,
      isLoading: false
    });
  }
}

export default ClientList;
