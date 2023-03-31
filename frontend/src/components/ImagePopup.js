import React from "react";

function ImagePopup(props) {
  const classyName = `popup popup_zoomed ${
    props.isOpen && props.card.link !== "" ? "popup_opened" : ""
  }`;

  return (
    <div className={classyName} id="zoomImg" onClick={props.onClose}>
      <div className="popup__zoomimg-box">
        <img
          className="popup__zoomimg"
          src={props.card.src}
          alt={props.card.alt}
        />
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__zoomimg-caption"></h2>
      </div>
    </div>
  );
}

export default ImagePopup;
