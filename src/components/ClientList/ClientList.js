import React from "react";
import axios from "axios";

import Header from "../Header";
import AddClientForm from "./AddClientForm";

import "./ClientList.css";

class ClientList extends React.Component {
  state = {
    clientListData: null,
    clientList: null,
    searchFilter: "",
    PopUpAddClient: false,
    isLoading: true
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

  render() {
    if (this.state.isLoading === true) {
      return <p>En cours de chargement ...</p>;
    }
    {
      /* copie des données pour filtre */
    }
    let clientListArray = [...this.state.clientListData];
    {
      /*  filtre "size" , "name" et "field" */
    }
    const result = clientListArray.filter(search => {
      return (
        search.size
          .toLowerCase()
          .indexOf(this.state.searchFilter.toLowerCase()) !== -1 ||
        search.name
          .toLowerCase()
          .indexOf(this.state.searchFilter.toLowerCase()) !== -1 ||
        search.field
          .toLowerCase()
          .indexOf(this.state.searchFilter.toLowerCase()) !== -1
      );
    });

    return (
      <div>
        {/* header  */}
        <div>
          <Header />
        </div>
        {/* header---end  */}

        {/* title  page : Clients & view  */}
        <div className="titlePage">
          <p> Clients</p>
          <p> Affichés : {result.length}</p>
        </div>
        {/* title  page : Clients & view---end */}

        {/* Search bar & button--start */}
        <div className="boxSearchBarAndButton">
          {/* 1-Search bar */}
          <input
            type="search"
            name="searchFilter"
            placeholder="rechercher client, secteur, taille"
            className="searchbar"
            value={this.state.searchFilter}
            onChange={this.handleChange}
          />
          {/* 2-button */}
          <button onClick={this.togglePopup} className="addClientButton">
            {" "}
            ajouter un client
          </button>
          {/* 2-1 page ajout client */}
          <div classeName="addClientPage">
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
        <div className="clientListBox">
          {/* Clientlist array Entries--start */}
          <div className="clientArrayEntries">
            <ul>
              {/* <li>XXX</li> */}
              <li>
                <button className="deleteAll" />
              </li>
              <li>
                Note <span>▿</span>
              </li>
              <li>
                Entreprise <span>▿</span>
              </li>
              <li>
                Secteur <span>▿</span>
              </li>
              <li>
                Taille <span>▿</span>
              </li>
              <li>
                Comptes <span>▿</span>
              </li>
              <li>
                Recrutements <span>▿</span>
              </li>
            </ul>
          </div>
          {/* Clientlist array boxEntries--end */}
          {/* clientList array item*/}
          <div className="clientListItemContainer">
            <div>
              {result.map((client, id) => {
                return (
                  <ul key={client._id} className="clientListItem">

                    <li>
                      <button className="deleteAll" />
                    </li>
                    <li>{client.rating ? client.numberOfUser : "0"}</li>

                    <li>
                      <a href="#">{client.name}</a>
                    </li>
                    <li>{client.field}</li>
                    <li>{client.size}</li>
                    <li>{client.numberOfUser ? client.numberOfUser : "0"}</li>
                    <li>{client.recruited ? client.recruited : "0"}</li>
                  </ul>
                );
              })}
            </div>
          </div>
          {/* clientList array item---end*/}
        </div>

        {/* Clientlistarraybox fulllength--end*/}
        {/* page-end */}
      </div>
    );
  }
  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/client"
    );
    console.log(response.data);
    this.setState({
      clientListData: response.data,
      isLoading: false
    });
  }
}

export default ClientList;
