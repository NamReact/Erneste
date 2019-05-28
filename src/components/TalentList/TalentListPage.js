import React from "react";
import axios from "axios";
import Title from "./Title";
import TagFilter from "./TagFilter";
import TitleLine from "./TitleLine";
import TalentList from "./TalentList";
import Header from "../Header";
import Tools from "./Tools";
import "./TalentListPage.css";

class TalentListPage extends React.Component {
  state = {
    talentList: [],
    isLoading: true,
    delete: false,
    searchInput: ""
  };

  // Function to GET data from /talent
  getData = async toto => {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/"
    );
    this.setState({
      isLoading: false,
      talentList: response.data
    });
  };

  // Function to POST id of 1 element we want to delete
  deletePost = async toto => {
    await axios.post("https://ernest-server.herokuapp.com/talent/delete", {
      id: toto
    });
  };

  // Function that enable to delete element which are checked
  deleteClick = async toto => {
    const talentListCopie = [...this.state.talentList];
    for (let i = 0; i < this.state.talentList; i++) {
      talentListCopie[i] = this.state.talentList[i];
    }
    let test = talentListCopie.filter(element => {
      return element.delete === true;
    });
    for (let i = 0; i < test.length; i++) {
      console.log(test[i]._id);
      this.setState({ isLoading: true });
      await this.deletePost(test[i]._id);
    }
    await this.getData();
  };

  deleteCheckBox = async id => {
    const talentListCopie = [...this.state.talentList];
    let element = talentListCopie.find(toto => toto._id === id);
    element.delete = !element.delete;
    this.setState({ talentList: talentListCopie });
    if (this.state.talentList.find(toto => toto.delete === true)) {
      this.setState({ delete: true });
    } else {
      this.setState({ delete: false });
    }
  };

  render() {
    /* Filtre sur le research input */
    // Copie du state
    let talentListCopieFilter = [];
    if (this.state.talentList.length > 0) {
      const talentListCopie = [...this.state.talentList];
      for (let i = 0; i < this.state.talentList; i++) {
        talentListCopie[i] = this.state.talentList[i];
      }

      // On crée le filtre

      // 1. On crée un tableau de key, pour pouvoir parcourir l'objet ensuite

      let filter = this.state.searchInput.toLowerCase();
      talentListCopieFilter = talentListCopie.filter(element => {
        return (
          element.informations.firstName.toLowerCase().includes(filter) ||
          element.informations.lastName.toLowerCase().includes(filter) ||
          element.informations.actualCompany.toLowerCase().includes(filter) ||
          element.informations.actualTitle.toLowerCase().includes(filter) ||
          element.informations.wantedTitle.toLowerCase().includes(filter)
        );
      });
      console.log(
        "test0 :",
        talentListCopie[0].informations.firstName.toLowerCase()
      );
      console.log("test1 :", talentListCopieFilter);
      console.log("test2 :", filter);
    }
    /* Test du Loading */

    if (this.state.isLoading === true) {
      return "Loading....";
    }

    return (
      <div className="container">
        <Header />
        <div className="talentList-container">
          <div className="talentList-left-block">
            <Title talentList={talentListCopieFilter} />
            <TagFilter />
          </div>
          <div className="talentList-right-block">
            <Tools
              delete={this.state.delete}
              searchInput={this.state.searchInput}
              addTalent={this.addTalent}
              deleteClick={this.deleteClick}
              searchType={event => {
                this.setState({ searchInput: event });
              }}
            />
            <TitleLine />
            <TalentList
              talentList={talentListCopieFilter}
              deleteCheckBox={id => {
                this.deleteCheckBox(id);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.getData();
  }
}

export default TalentListPage;
