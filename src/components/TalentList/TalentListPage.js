import React from "react";
import axios from "axios";
import Title from "./Title";
import TagFilter from "./TagFilter";
import TitleLine from "./TitleLine";
import TalentList from "./TalentList";
import Tools from "./Tools";
import "./TalentListPage.css";
import { Redirect } from "react-router-dom";

/* Page to see the Talent List (HomePage of Admin)*/

class TalentListPage extends React.Component {
  state = {
    /* State updated from the GET in ComponentDiMount*/
    talentList: [],
    titleList: [],
    tagList: [],
    isLoading: true,

    /* State for delete a line of talent */
    delete: false,

    searchInput: "",
    titleArray: [
      { value: "Nom", clicked: false, firstClicked: false },
      { value: "Fonction", clicked: false, firstClicked: false },
      { value: "Entreprise", clicked: false, firstClicked: false },
      { value: "Souhait", clicked: false, firstClicked: false },
      { value: "Validé", clicked: false, firstClicked: false },
      { value: "Statut", clicked: false, firstClicked: false },
      { value: "Dernière modif.", clicked: false, firstClicked: false }
    ],

    /* Chevron Filter State */
    chevronClikedPosition: null,
    chevronFilter: [],
    filterOrder: 0,

    /* Tag Filter State */
    tagList: [],
    tagFilterInputValue: "",
    tagFilterSelected: [],
    tagSuggestionsShown: false,
    tagListFiltered: [],
    tagActiveSuggestion: 0
  };

  // Function to GET data from /talent
  getDataTalentList = async toto => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/talent/",
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    // We switch the wantedTitle ID by its name

    for (let i = 0; i < response.data.length; i++) {
      for (
        let j = 0;
        j < response.data[i].informations.wantedTitle.length;
        j++
      ) {
        for (let k = 0; k < this.state.titleList.length; k++) {
          if (
            this.state.titleList[k]._id ===
            response.data[i].informations.wantedTitle[j]
          ) {
            response.data[i].informations.wantedTitle[j] = this.state.titleList[
              k
            ].name;
            break;
          }
        }
      }
    }

    // We sort the array by lastUpdate

    // The date we get is type "29 05 2019, 15 05 98"
    // We want to show 29/05/2019, but the sort has to be on hour minutes secondes too

    // 1. change of the 29 05 2019, 15 05 98 into [[29,05,2019],[15,05,98]]

    for (let i = 0; i < response.data.length; i++) {
      if (typeof response.data[i].lastUpdate === "string") {
        response.data[i].lastUpdate = response.data[i].lastUpdate.split(",");
        response.data[i].lastUpdate[0] = response.data[i].lastUpdate[0]
          .trim()
          .split(" ");
        if (response.data[i].lastUpdate[1]) {
          response.data[i].lastUpdate[1] = response.data[i].lastUpdate[1]
            .trim()
            .split(" ");
        }
      }
    }

    // response.data got his lastupdateDate like [[29,05,2019],[15,05,98]]
    // We create an array with all lastUpdate date from the response.data  array

    let lastUpdateArray = [];
    for (let i = 0; i < response.data.length; i++) {
      lastUpdateArray.push(response.data[i].lastUpdate);
    }

    // We sort lastUpdateArray

    lastUpdateArray
      .sort((a, b) => {
        // sort seconds
        if (a[1] && b[1]) {
          return a[1][2] - b[1][2];
        } else return false;
      })
      .sort((a, b) => {
        // sort minutes
        if (a[1] && b[1]) {
          return b[1][1] - a[1][1];
        } else return false;
      })
      .sort((a, b) => {
        // sort hour
        if (a[1] && b[1]) {
          return b[1][0] - a[1][0];
        } else return false;
      })
      .sort((a, b) => {
        // sort day
        return b[0][0] - a[0][0];
      })
      .sort((a, b) => {
        // sort month
        return b[0][1] - a[0][1];
      })
      .sort((a, b) => {
        // sort year
        return b[0][2] - a[0][2];
      });

    // LastUpdateArray is sorted, we recreate response.data with same order
    let responseSorted = [];
    for (let i = 0; i < lastUpdateArray.length; i++) {
      for (let j = 0; j < response.data.length; j++) {
        if (response.data[j].lastUpdate === lastUpdateArray[i]) {
          responseSorted.push(response.data[j]);
        }
      }
    }

    // Change lastUpdate from [[29,05,2019],[15,05,98]] to 29/05/2019

    for (let i = 0; i < responseSorted.length; i++) {
      responseSorted[i].lastUpdate = responseSorted[i].lastUpdate[0].join(".");
    }

    await this.setState({
      isLoading: false,
      talentList: responseSorted
    });
  };

  // Function GET data from /tag
  getDataTagList = async toto => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/tag",
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    this.setState({
      isLoading: false,
      tagList: response.data
    });
  };

  // Function GET data from /title
  getDataTitleList = async toto => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/title",
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    await this.setState({
      isLoading: false,
      titleList: response.data
    });
  };

  /* DELETE OF A TALENT */

  // Function to enable to delete a talent, also enable to display the "delete the selected profils" by changing the state delete
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

  // Function to POST id of 1 talent we want to delete in dataBase
  deletePost = async toto => {
    await axios.post(
      "https://ernest-server.herokuapp.com/talent/delete",
      {
        id: toto
      },
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
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

  //Function to make appear the delete button
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

  /* SEARCH INPUT FUNCTION */

  searchType = event => {
    this.setState({ searchInput: event });
  };
  // Function to empty the input on click X
  onClickClearSearch = () => {
    this.setState({ searchInput: "" });
  };

  /* CHEVRON FILTER FUNCTION*/

  // Function to detect click on a chevron
  chevronClick = toto => {
    const titleArrayCopie = [...this.state.titleArray];
    for (let i = 0; i < titleArrayCopie.length; i++) {
      if (titleArrayCopie[i].value === toto) {
        titleArrayCopie[i].clicked = !titleArrayCopie[i].clicked;
        this.setState({ chevronClikedPosition: i });
      } else {
        titleArrayCopie[i].clicked = false;
      }
    }

    this.setState({ titleArray: titleArrayCopie });
  };

  // Function to clear all filters from chevron
  onDeleteChevronFilterClick = () => {
    let chevronFilterCopie = [...this.state.chevronFilter];
    chevronFilterCopie.splice(0, chevronFilterCopie.length);
    this.setState({ chevronFilter: chevronFilterCopie });
  };

  // Function to insert the filter chosen
  filterCheckBox = async (titleType, filterChosen) => {
    const chevronFilterCopie = [...this.state.chevronFilter];
    let titleTypePosition = chevronFilterCopie
      .map(element => {
        return element.title;
      })
      .indexOf(titleType);
    if (titleTypePosition === -1) {
      await this.setState({ filterOrder: this.state.filterOrder + 1 });
      chevronFilterCopie.push({
        title: titleType,
        filter: [filterChosen],
        filterOrder: this.state.filterOrder
      });
    } else {
      if (
        chevronFilterCopie[titleTypePosition].filter.indexOf(filterChosen) ===
        -1
      ) {
        chevronFilterCopie[titleTypePosition].filter.push(filterChosen);
      } else {
        chevronFilterCopie[titleTypePosition].filter.splice(
          chevronFilterCopie[titleTypePosition].filter.indexOf(filterChosen),
          1
        );
      }

      // If we remove all elements of the filter, we splice the element from the array et we reduce the order of 1

      if (chevronFilterCopie[titleTypePosition].filter.length < 1) {
        let FilterRemovedOrder =
          chevronFilterCopie[titleTypePosition].filterOrder;

        chevronFilterCopie.splice(titleTypePosition, 1);
        // On réduit le numéro du filterOrder

        await this.setState({ filterOrder: this.state.filterOrder - 1 });

        // On réduit le filterOrder de tous les autres filtres qui ont un order plus grand
        for (let i = 0; i < chevronFilterCopie.length; i++) {
          if (chevronFilterCopie[i].filterOrder > FilterRemovedOrder) {
            chevronFilterCopie[i].filterOrder =
              chevronFilterCopie[i].filterOrder - 1;
          }
        }
      }
    }
    // sort chevronFilterCopie by filterOrder
    chevronFilterCopie.sort((a, b) => {
      return a.filterOrder - b.filterOrder;
    });

    await this.setState({ chevronFilter: chevronFilterCopie });
  };

  /* TAG FUNTION */

  // Function that deals with the tag input

  onChangeTagInput = toto => {
    let tagListFiltered = this.state.tagList.filter(element => {
      return element.name.toLowerCase().indexOf(toto.toLowerCase()) > -1;
    });
    this.setState({
      tagFilterInputValue: toto,
      tagListFiltered: tagListFiltered,
      tagSuggestionsShown: true
    });
  };

  // Function to put tag as a filter
  onClickTag = tag => {
    let tagSuggestionsCopie = [...this.state.tagFilterSelected];
    tagSuggestionsCopie.push(tag);

    this.setState({
      tagFilterSelected: tagSuggestionsCopie,
      tagFilterInputValue: "",
      tagActiveSuggestion: 0,
      tagSuggestionsShown: false
    });
  };

  // Function that detect keyboard Key on tagInput
  onKeyDownTagInput = e => {
    // ENTER, it adds the tag
    if (e.keyCode === 13) {
      let tagSuggestionsCopie = [...this.state.tagFilterSelected];
      tagSuggestionsCopie.push(
        this.state.tagListFiltered[this.state.tagActiveSuggestion]
      );
      this.setState({
        tagFilterSelected: tagSuggestionsCopie,
        tagFilterInputValue: "",
        tagActiveSuggestion: 0,
        tagSuggestionsShown: false
      });
    }

    // UP ARROW
    else if (e.keyCode === 38) {
      if (this.state.tagActiveSuggestion === 0) {
        return;
      } else {
        this.setState({
          tagActiveSuggestion: this.state.tagActiveSuggestion - 1
        });
      }
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (
        this.state.tagActiveSuggestion - 1 ===
        this.state.tagListFiltered.length
      ) {
        return;
      }
      this.setState({
        tagActiveSuggestion: this.state.tagActiveSuggestion + 1
      });
    }
    // ESCAPE
    else if (e.keyCode === 27) {
      this.setState({ tagSuggestionsShown: false });
    }
  };

  // Function to delete all tag from the filter
  onDeleteAllTagClick = () => {
    let tagSuggestionsCopie = [...this.state.tagFilterSelected];
    tagSuggestionsCopie.splice(0, tagSuggestionsCopie.length);
    this.setState({ tagFilterSelected: tagSuggestionsCopie });
  };
  // Function to delete one tag
  onSingleTagDeleteClick = index => {
    let tagSuggestionsCopie = [...this.state.tagFilterSelected];
    tagSuggestionsCopie.splice(index, 1);
    this.setState({ tagFilterSelected: tagSuggestionsCopie });
  };

  render() {
    /* Permission test */
    if (this.props.permission !== "Admin") {
      return <Redirect to={"/"} />;
    }

    /* Test of Loading... */

    if (this.state.isLoading === true) {
      return "Loading....";
    }

    let talentListCopieFilter = [];
    let ArrayOfFilteredTalentList = [];

    // Copie of TalentList state
    if (this.state.talentList.length > 0) {
      const talentListCopie = [...this.state.talentList];
      for (let i = 0; i < this.state.talentList; i++) {
        talentListCopie[i] = this.state.talentList[i];
      }

      // FILTER THE LIST WITH THE SEARCH INPUT

      let filter = this.state.searchInput.toLowerCase();
      talentListCopieFilter = talentListCopie.filter(element => {
        let bool = false;
        if (
          element.informations.firstName &&
          element.informations.firstName.toLowerCase().includes(filter)
        ) {
          bool = true;
        }

        if (
          element.informations.lastName &&
          element.informations.lastName.toLowerCase().includes(filter)
        ) {
          bool = true;
        }
        if (
          element.informations.actualCompany &&
          element.informations.actualCompany.toLowerCase().includes(filter)
        ) {
          bool = true;
        }
        if (
          element.informations.actualTitle &&
          element.informations.actualTitle.toLowerCase().includes(filter)
        ) {
          bool = true;
        }
        if (
          element.informations.wantedTitle &&
          element.informations.wantedTitle.length > 0
        ) {
          for (let i = 0; i < element.informations.wantedTitle.length; i++) {
            if (
              element.informations.wantedTitle[i].toLowerCase().includes(filter)
            ) {
              bool = true;
            }
          }
        }
        return bool;
      });

      // FILTER WITH TAGS
      let tagFilter = this.state.tagFilterSelected;

      if (tagFilter.length > 0) {
        talentListCopieFilter = talentListCopieFilter.filter(element => {
          // On crée un tableau de booléen,La longueur du tableau de booléen doit être celle de tagFilter, on remplit ce tableau de true à la base
          let bool = Array(tagFilter.length).fill(true);
          let booltest = true;
          if (element.skills.length > 0) {
            for (let i = 0; i < tagFilter.length; i++) {
              for (let j = 0; j < element.skills.length; j++) {
                if (tagFilter[i]._id === element.skills[j]) {
                  bool[i] = true;
                  break;
                } else {
                  bool[i] = false;
                }
              }
            }
            for (let i = 0; i < bool.length; i++) {
              if (bool[i] === false) {
                booltest = false;
              }
            }
            return booltest;
          }
        });
      }
      //  FILTER BY CLICKING ON CHEVRON

      // On crée un tableau qui stock les différentes listes filtrées
      //A la base il a la première liste filtrée par le research
      ArrayOfFilteredTalentList = [talentListCopieFilter];

      //1. On applique les filtres, et on enregistre la nouvelle liste filtrée à chaque fois
      if (this.state.chevronFilter) {
        for (let i = 0; i < this.state.chevronFilter.length; i++) {
          talentListCopieFilter = talentListCopieFilter.filter(element => {
            let bool = false;
            // cas wantedTitle
            if (this.state.chevronFilter[i].title === "wantedTitle") {
              for (
                let j = 0;
                j <
                element.informations[this.state.chevronFilter[i].title].length;
                j++
              ) {
                for (
                  let k = 0;
                  k < this.state.chevronFilter[i].filter.length;
                  k++
                ) {
                  if (
                    element.informations[this.state.chevronFilter[i].title][
                      j
                    ] === this.state.chevronFilter[i].filter[k]
                  ) {
                    bool = true;
                  }
                }
              }
              return bool;
            } else if (
              // cas validated et lastUpdate
              this.state.chevronFilter[i].title === "validated" ||
              this.state.chevronFilter[i].title === "lastUpdate"
            ) {
              for (
                let j = 0;
                j < this.state.chevronFilter[i].filter.length;
                j++
              ) {
                if (
                  element[this.state.chevronFilter[i].title].toString() ===
                  this.state.chevronFilter[i].filter[j]
                ) {
                  bool = true;
                }
              }
              return bool;
            } else {
              // cas actualTitle,actualCompany,status
              for (
                let j = 0;
                j < this.state.chevronFilter[i].filter.length;
                j++
              ) {
                if (
                  element.informations[this.state.chevronFilter[i].title] ===
                  this.state.chevronFilter[i].filter[j]
                ) {
                  bool = true;
                }
              }
              return bool;
            }
          });
          // On push la listefiltrée dans le tableau des listes filtrées
          ArrayOfFilteredTalentList.push(talentListCopieFilter);
        }
      }
    }
    return (
      <div className="content">
        <div className="container">
          <div className="talentList-container">
            <div className="talentList-left-block">
              <Title talentList={talentListCopieFilter} />
              <TagFilter
                tagFilterInputValue={this.state.tagFilterInputValue}
                tagListFiltered={this.state.tagListFiltered}
                tagFilterSelected={this.state.tagFilterSelected}
                tagSuggestionsShown={this.state.tagSuggestionsShown}
                onChangeTagInput={this.onChangeTagInput}
                onClickTag={this.onClickTag}
                tagActiveSuggestion={this.state.tagActiveSuggestion}
                onKeyDownTagInput={this.onKeyDownTagInput}
                onDeleteAllTagClick={this.onDeleteAllTagClick}
                onSingleTagDeleteClick={this.onSingleTagDeleteClick}
              />
            </div>
            <div className="talentList-right-block">
              <Tools
                delete={this.state.delete}
                searchInput={this.state.searchInput}
                addTalent={this.addTalent}
                deleteClick={this.deleteClick}
                searchType={this.searchType}
                onClickClearSearch={this.onClickClearSearch}
                chevronFilter={this.state.chevronFilter}
                onDeleteChevronFilterClick={this.onDeleteChevronFilterClick}
              />
              <TitleLine
                talentListNonFiltered={this.state.talentList}
                ArrayOfFilteredTalentList={ArrayOfFilteredTalentList}
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
    this.getDataTitleList();
    this.getDataTalentList();
    this.getDataTagList();
    this.props.setPageActive("admin/talent");
  }
}

export default TalentListPage;
