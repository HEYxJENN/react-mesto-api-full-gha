import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function AddPlace(props) {
  // const [cards, setCards] = React.useState("");

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(link);
    props.onUpdate({ name, link });
    setName("");
    setLink("");
    // props.onClose();
  };

  const handlePlaceLink = (e) => {
    setLink(e.target.value);
  };
  const handlePlaceName = (e) => {
    setName(e.target.value);
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={props.title}
      id="add"
    >
      <>
        <label>
          <input
            type="text"
            name="field-placename"
            placeholder="название"
            className="popup__input enterplacename"
            id="enterplacename"
            required
            minLength="2"
            maxLength="30"
            onChange={handlePlaceName}
            value={name}
          />
          <span className="popup__forms-input-error enterplacename-error"></span>
        </label>
        <label>
          <input
            type="url"
            name="field-link"
            placeholder="ссылка на картинку"
            className="popup__input enterlink"
            id="enterlink"
            required
            onChange={handlePlaceLink}
            value={link}
          />
          <span className="popup__forms-input-error enterlink-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default AddPlace;
