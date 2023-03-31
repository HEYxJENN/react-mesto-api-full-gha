import React from "react";
import Apr from "../images/Approved.png";
import Dec from "../images/Declined.png";

function InfoTool(props) {
  const classy = props.isOpened ? "popup popup_opened" : "popup";
  const imag = props.suc ? Apr : Dec;
  const inscription = props.suc
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте еще раз.";

  return (
    <div className={classy}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <img src={imag} alt="answerSign" className="popup__success" />
        <h3 className="popup__inscription">{inscription}</h3>
      </div>
    </div>
  );
}

export default InfoTool;
