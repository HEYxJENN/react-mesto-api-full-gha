import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatar(props) {
  const [avatar, setAvatar] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(avatar);
    props.onUpdate({
      avatar: avatar,
    });
    setAvatar("");
    // props.onClose();
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={props.title}
      id="avatar"
    >
      <>
        <label>
          <input
            type="url"
            name="field-link"
            placeholder="введите ссылку на новый аватар"
            className="popup__input enterlinkAv enterAvatarLink"
            id="enterlinkAv"
            required
            onChange={handleAvatarChange}
            value={avatar}
          />
          <span className="popup__forms-input-error enterlinkAv-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default EditAvatar;
