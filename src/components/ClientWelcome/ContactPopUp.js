import React from "react";
import "./ContactPopUp.css";

function ContactPopUp(props) {
  const { cancelPopUp } = props;
  return (
    <div className="contactPopUp-background">
      <div className="contactPopUp">
        <div className="contactPopUp-header">
          <span className="contactPopUp-header-title">Contacter</span>
          <i
            class="fas fa-times contactPopUp-header-cancel"
            onClick={cancelPopUp}
          />
        </div>
        <div className="contactPopUp-body">
          <span className="contactPopUp-subtitle">Objet</span>
          <input className="contactPopUp-input" />
          <span className="contactPopUp-subtitle">Messages</span>
          <textarea className="contactPopUp-textArea" placeholder="Messages" />
          <div className="contactPopUp-add">
            <div className="contactPopUp-addButton">
              <i class="fas fa-paperclip contactPopUp-add-attachment" />
              <span>Ajouter pièce jointe</span>
            </div>
          </div>
          <div className="contactPopUp-added">Pièce jointe téléchargée</div>
          <div className="contactPopUp-buttons">
            <div className="contactPopUp-cancel" onClick={cancelPopUp}>
              Annuler
            </div>
            <div className="contactPopUp-send">Envoyer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPopUp;
