import React from "react";
import axios from "axios";

class TagList extends React.Component {
  state = {
    data: null,
    search: ""
  };

  // setState pour l'input
  onChange = e => {
    this.setState({ search: e.target.value });
  };

  // fonctions permettant de rajouter un nouveau tag à la base de données.
  // le post reçoit en réponse la liste de tout les tags et met à jour le state.
  addSoftTag = async () => {
    const response = await axios.post(
      "https://ernest-server.herokuapp.com/tag/create",
      { name: this.state.search, type: "soft" },
      { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({ data: response.data });
  };

  addHardTag = async () => {
    const response = await axios.post(
      "https://ernest-server.herokuapp.com/tag/create",
      { name: this.state.search, type: "hard" },
      { headers: { authorization: "Bearer " + "GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({ data: response.data });
  };

  render() {
    if (this.state.data === null) {
      return <div />;
    }

    // définition de la RegExp par rapport au state
    const tagSearch = new RegExp(this.state.search);

    // filter pour récupérer les résultats du regexp dans un tableau
    const tagList = this.state.data.filter(tag => {
      return tagSearch.test(tag.name) === true;
    });

    // le tableau est ensuite transformer pour afficher uniquement le nom dans la liste.
    // une fonction en props retourne l'objet tag dans le composant parent afin de traiter l'information et
    // afficher les tags dans le textarea
    const filteredTagList = tagList.map(item => {
      return (
        <div
          id={item._id}
          key={item._id}
          onClick={() => this.props.setTag(item)}
          className="tag-option"
        >
          {item.name}
        </div>
      );
    });

    const addSoft = `${this.props.buttons} soft-skills`;
    const addHard = `${this.props.buttons} hard-skills`;

    return (
      <div className={this.props.class}>
        <input
          name="tag search"
          value={this.state.search}
          onChange={this.onChange}
          placeholder="Recherche skills..."
        />

        <div className={this.props.listClass}>{filteredTagList}</div>
        <div onClick={this.addSoftTag} className={addSoft}>
          Ajouter un soft skill
        </div>
        <div onClick={this.addHardTag} className={addHard}>
          Ajouter un hard skill
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/tag",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );
    this.setState({ data: response.data });
  }
}

export default TagList;
