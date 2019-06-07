import React from "react";
import axios from "axios";
import "./AdminChanges.css";

class AdminChanges extends React.Component {
  state = {
    tag: [],
    sector: [],
    title: [],
    loadingtag: true,
    loadingsector: true,
    loadingtitle: true,
    status: null,
    elementstodelete: [],
    itemtodisplay: {},
    newTag: "",
    newTagType: "",
    newTagName: "",
    tagTypeToDisplay: false,
    newSector: null,
    newTitle: null,
    statusInput: null
  };

  onTagClick = e => {
    this.setState({ status: 1 });
  };

  onSecteurClick = e => {
    this.setState({ status: 2 });
  };

  onFonctionClick = e => {
    this.setState({ status: 3 });
  };

  /* DELETE */

  /* Fonction to select tags to delete  */
  onSelectedTag = e => {
    for (let i = 0; i < this.state.tag.length; i++) {
      if (e === this.state.tag[i]._id) {
        this.state.elementstodelete.push(this.state.tag[i]._id);
        break;
      }
    }
    const newTab = [...this.state.elementstodelete];
    this.setState({ elementstodelete: newTab });
    console.log(this.state.elementstodelete);
  };

  /* Function to delete */
  deleteElement = async () => {
    const tags = this.state.elementstodelete;

    await axios.post(
      "https://ernest-server.herokuapp.com/tag/delete",
      { tags },
      {
        headers: { authorization: `Bearer ${this.props.token}` }
      }
    );
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/tag",
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    this.setState({
      tag: response.data,

      loadingtag: false
    });
  };

  /* MODIFY */

  /* fonction to select item to modify */
  onSelectedItem = e => {
    this.setState({
      itemtodisplay: {
        id: e._id,
        name: e.name,
        type: e.type
      },
      statusInput: null
    });
  };

  /* Functions to modify tag name and type*/

  handleChange = e => {
    const newTag = this.state.itemtodisplay;

    newTag.name = e.target.value;

    this.setState({ itemtodisplay: newTag });
  };

  onTagTypeClick = () => {
    this.setState({ tagTypeToDisplay: true });
  };

  setTagType = type => {
    const newTag = this.state.itemtodisplay;
    newTag.type = type;

    this.setState({ itemtodisplay: newTag });
  };

  modifyElement = async () => {
    let tag = this.state.itemtodisplay;

    await axios.post(
      "https://ernest-server.herokuapp.com/tag/update",
      {
        tag
      },
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/tag",
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    this.setState({
      tag: response.data,

      loadingtag: false
    });
  };

  /* ADD */

  /* entrer une nouvelle valeur */
  /* display the input to add a new tag rather than the input to modify */
  inputElement = () => {
    this.setState({ statusInput: this.state.status });
  };

  handleChangeAdd = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* poster la nouvelle valeur */

  addElement = async () => {
    await axios.post(
      "https://ernest-server.herokuapp.com/tag/create",
      {
        name: this.state.newTagName,
        type: this.state.newTagType
      },
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/tag",
      { headers: { authorization: `Bearer ${this.props.token}` } }
    );
    this.setState({
      tag: response.data,

      loadingtag: false
    });
  };

  render() {
    if (
      this.state.loadingtag ||
      this.state.loadingtitle ||
      this.state.loadingsector
    ) {
      return <div>loading</div>;
    }

    return (
      <div className="container-for-admin">
        <div className="left-changes-bdd">
          <div className="button-for-admin" onClick={this.onTagClick}>
            Tags
          </div>
          <div className="button-for-admin" onClick={this.onSecteurClick}>
            Secteurs
          </div>
          <div className="button-for-admin" onClick={this.onFonctionClick}>
            Fonctions
          </div>
        </div>
        <div className="right-changes-bdd">
          <div className="list-to-change">
            {/* status 1 : display of the tags */}
            {this.state.status === 1
              ? this.state.tag.map(item => {
                  return (
                    <div className="display-tag-to-change">
                      <div
                        className="selector"
                        onClick={() => {
                          this.onSelectedTag(item._id);
                        }}
                      />
                      <div
                        className="items-to-change"
                        key={item._id}
                        onClick={() => this.onSelectedItem(item)}
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })
              : false}
            {/* status 2 : display of the sectors */}
            {this.state.status === 2
              ? this.state.sector.map(item => {
                  return (
                    <div className="items-to-change" key={item._id}>
                      {item.name}
                    </div>
                  );
                })
              : false}
            {/* status 3 : display of the titles */}
            {this.state.status === 3
              ? this.state.title.map(item => {
                  return (
                    <div className="items-to-change" key={item._id}>
                      {item.name}
                    </div>
                  );
                })
              : false}
          </div>
          {/* Display to modify tag name and type*/}
          <div className="tag-modification-container">
            {this.state.statusInput !== 1 ? (
              this.state.itemtodisplay.id ? (
                <div className="input-to-modify-tag">
                  <input
                    type="string"
                    name="name"
                    value={this.state.itemtodisplay.name}
                    onChange={this.handleChange}
                    className="input-tag-type-to-modify"
                  />
                  <div className="input-to-modify-tag-type">
                    <input
                      type="string"
                      name="type"
                      value={this.state.itemtodisplay.type}
                      onClick={this.onTagTypeClick}
                      className="input-tag-type-to-modify"
                    />
                    {/* Display of types to select from for tag update*/}
                    {this.state.tagTypeToDisplay === true ? (
                      <div>
                        <div
                          className="type-display-hard"
                          onClick={e => {
                            this.setTagType("hard");
                          }}
                        >
                          hard
                        </div>
                        <div
                          className="type-display-soft"
                          onClick={e => {
                            this.setTagType("soft");
                          }}
                        >
                          soft
                        </div>
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                </div>
              ) : (
                false
              )
            ) : (
              false
            )}
            {/* Display to add tag name and tag type */}
            {this.state.status !== null && (
              <div className="add-element">
                <div className="add-element-button" onClick={this.inputElement}>
                  Ajouter un tag
                </div>
                {this.state.statusInput === 1 && (
                  <div className="input-to-modify-tag">
                    <div className="title">Name</div>
                    <input
                      name="newTagName"
                      type="string"
                      value={this.state.newTagName}
                      onChange={this.handleChangeAdd}
                      className="input-tag-type-to-modify"
                    />
                    <div className="title">Type</div>
                    <input
                      name="newTagType"
                      type="string"
                      value={this.state.newTagType}
                      onChange={this.handleChangeAdd}
                      className="input-tag-type-to-modify"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {this.state.status === null ? (
            false
          ) : (
            <div className="buttons-for-action">
              <div className="button-for-action" onClick={this.addElement}>
                Ajouter
              </div>
              <div className="button-for-action" onClick={this.modifyElement}>
                Modifier
              </div>
              <div className="button-for-action" onClick={this.deleteElement}>
                Effacer
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://ernest-server.herokuapp.com/tag",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );
    const response2 = await axios.get(
      "https://ernest-server.herokuapp.com/sector",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );
    const response3 = await axios.get(
      "https://ernest-server.herokuapp.com/title",
      { headers: { authorization: "Bearer GFhOYeUPB2CA6TKZ" } }
    );

    this.setState({
      tag: response.data,
      sector: response2.data,
      title: response3.data,
      loadingtag: false,
      loadingsector: false,
      loadingtitle: false
    });
  }
}

export default AdminChanges;
