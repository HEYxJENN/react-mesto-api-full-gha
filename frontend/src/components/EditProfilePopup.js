import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export function EditProfile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("saved");
    props.onUpdate({
      name: name,
      about: description,
    });
    // props.onClose();
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={props.title}
      id="edit"
    >
      <>
        <label>
          <input
            type="text"
            name="field-name"
            placeholder="enter name"
            className="popup__input entername"
            id="entername"
            required
            minLength="2"
            maxLength="40"
            // value={name}
            onChange={handleNameChange}
          />
          <span
            className="popup__forms-input-error entername-error"
            id="entername-error"
          ></span>
        </label>
        <label>
          <input
            type="text"
            name="field-about"
            placeholder="who is it?"
            className="popup__input enterabout"
            id="enterabout"
            required
            minLength="2"
            maxLength="200"
            // value={description}
            onChange={handleDescriptionChange}
          />
          <span
            className="popup__forms-input-error about-error enterabout-error"
            id="enterabout-error"
          ></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default EditProfile;
