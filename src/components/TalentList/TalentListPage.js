import React from "react";
import axios from "axios";
import Title from "./Title";
import TagFilter from "./TagFilter";
import TitleLine from "./TitleLine";
import TalentList from "./TalentList";
import HeaderAdmin from "../HeaderAdmin";
import Tools from "./Tools";
import "./TalentListPage.css";

class TalentListPage extends React.Component {
  state = {
    talentList: [],
    isLoading: true,
    delete: false,
    searchInput: "",
    titleArray: [
      { value: "Nom", clicked: false },
      { value: "Fonction", clicked: false },
      { value: "Entreprise", clicked: false },
      { value: "Souhait", clicked: false },
      { value: "Validé", clicked: false },
      { value: "Statut", clicked: false },
      { value: "Dernière modif.", clicked: false }
    ],
    chevronClikedPosition: null,
    chevronFilter: [],
    tagList: [],
    tagFilterInputValue: "",
    // tag
    tagFilterShown: []
  };

  // Function to GET data from /talent
  getDataTalentList = async toto => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/"
    );
    this.setState({
      isLoading: false,
      talentList: response.data
    });
  };

  // Function GET data from /tag
  getDataTagList = async toto => {
    this.setState({ isLoading: true });
    const response = await axios.get("https://ernest-server.herokuapp.com/tag");
    this.setState({
      isLoading: false,
      tagList: response.data
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
      this.setState({ isLoading: true });
      await this.deletePost(test[i]._id);
    }
    await this.getDataTalentList();
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

  chevronClick = toto => {
    const titleArrayCopie = [...this.state.titleArray];
    for (let i = 0; i < titleArrayCopie.length; i++) {
      if (titleArrayCopie[i].value === toto) {
        titleArrayCopie[i].clicked = !titleArrayCopie[i].clicked;
        this.setState({ chevronClikedPosition: i });
      } else {
        titleArrayCopie[i].clicked = false;
      }
      this.setState({ titleArray: titleArrayCopie });
    }
  };

  // On push dans le tableau de filtres si le filtre n'existe pas, sinon on le retire
  filterCheckBox = (titleType, filter) => {
    const chevronFilterCopie = [...this.state.chevronFilter];
    let position = 0;
    if (
      chevronFilterCopie
        .map(e => {
          return e.value;
        })
        .indexOf(filter) === -1 ||
      chevronFilterCopie
        .map(e => {
          return e.type;
        })
        .indexOf(titleType) === -1
    ) {
      chevronFilterCopie.push({ value: filter, type: titleType });
    } else {
      position = chevronFilterCopie
        .map(e => {
          return e.value;
        })
        .indexOf(filter);
      chevronFilterCopie.splice(position, 1);
    }
    this.setState({ chevronFilter: chevronFilterCopie });
  };
  // ON gère l'input du TagFilter
  handleChangeTagFilterInput = toto => {
    this.setState({ tagFilterInputValue: toto });
  };

  handleClickTagFilter = tag => {
    // On crée copie du tableau
    let tagFilterShownCopie = [...this.state.tagFilterShown];
    console.log("toto test:", tag);
    tagFilterShownCopie.push(tag);

    this.setState({
      tagFilterShown: tagFilterShownCopie,
      tagFilterInputValue: ""
    });
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

      // On crée le filtre sur la barre de research

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

      // On crée le filtre sur les chevrons, à  partir du tableau filtrer par les search
      // const test = [];
      // for (let i = 0; i < this.state.chevronFilter.length; i++) {
      //   test.push([talentListCopieFilter]);
      // }
      for (let i = 0; i < this.state.chevronFilter.length; i++) {
        talentListCopieFilter = talentListCopieFilter.filter(element => {
          if (
            this.state.chevronFilter[i].type === "validated" ||
            this.state.chevronFilter[i].type === "lastUpdate"
          ) {
            return (
              element[this.state.chevronFilter[i].type].toString() ===
              this.state.chevronFilter[i].value
            );
          } else {
            return (
              element.informations[this.state.chevronFilter[i].type] ===
              this.state.chevronFilter[i].value
            );
          }
        });
      }
    }
    /* Test du Loading */

    if (this.state.isLoading === true) {
      return "Loading....";
    }

    return (
      <div>
        <HeaderAdmin />
        <div className="container">
          <div className="talentList-container">
            <div className="talentList-left-block">
              <Title talentList={talentListCopieFilter} />
              <TagFilter
                tagFilterInputValue={this.state.tagFilterInputValue}
                tagList={this.state.tagList}
                tagFilterShown={this.state.tagFilterShown}
                handleChangeTagFilterInput={this.handleChangeTagFilterInput}
                handleClickTagFilter={this.handleClickTagFilter}
              />
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
              <TitleLine
                talentList={talentListCopieFilter}
                titleArray={this.state.titleArray}
                chevronClick={this.chevronClick}
                chevronClickedPosition={this.state.chevronClikedPosition}
                filterCheckBox={this.filterCheckBox}
                chevronFilter={this.state.chevronFilter}
              />
              <TalentList
                talentList={talentListCopieFilter}
                deleteCheckBox={this.deleteCheckBox}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.getDataTalentList();
    this.getDataTagList();
  }
}

export default TalentListPage;
