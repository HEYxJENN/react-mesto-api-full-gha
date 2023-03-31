import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function PopupWithForm(props) {
  const classyName = `popup ${props.isOpen ? "popup_opened" : ""}`;
  const content = `${
    `popup__${props.id}` === "popup__avatar"
      ? "popup__content-small"
      : "popup__content"
  } `;
  const buttonText = `${props.id === "popup__add" ? "Создать" : ""}`;

  React.useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };
    props.isOpen
      ? document.addEventListener("keydown", handleEscPress)
      : document.removeEventListener("keydown", handleEscPress);
  }, [props.isOpen, props.onClose]);

  return (
    <div className={classyName} id={props.id}>
      <div className={content}>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__blanc">{props.title}</h2>
        <form
          className="popup__forms"
          id={`form__${props.id}`}
          name={`form-${props.id}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__forms-fieldset">
            {props.children}
            <button
              className="popup__save"
              type="submit"
              // id="sure__edit_button"
            >
              {buttonText || "Сохранить"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

// <div class="popup" id="popup__areusure">
//   <div class="popup__content-verysmall">
//     <button type="button" class="popup__close"></button>
//     <h2 class="popup__edit  ">Вы уверены</h2>
//     <form
//       class="popup__forms"
//       id="sure__edit"
//       name="form-edit"
//       novalidate
//     >
//       <fieldset class="popup__forms-fieldset">
//         <button class="popup__save" type="submit" id="sure__edit_button">
//           Да
//         </button>
//       </fieldset>
//     </form>
//   </div>
// </div> */
