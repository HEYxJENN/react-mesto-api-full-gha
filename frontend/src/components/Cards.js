import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.ownerId === currentUser._id;
  const isLiked = props.likes.some((item) => item._id === currentUser._id);

  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : " "
  }`;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_visible" : "element__delete_hidden"
  }`;

  function handleLike() {
    props.onLikeClick(props.card);
    console.log("like");
  }

  function handleDelete() {
    props.onDeleteClick(props.card);
    console.log("Del");
  }

  function handleClick() {
    console.log("click");
  }

  return (
    <li className="element">
      <div className="element__image-block">
        <img
          className="element__image"
          src={props.picture}
          alt={props.name}
          onClick={props.onOpen}
        />
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDelete}
        ></button>
      </div>
      <div className="element__caption">
        <h2 className="element__name">{props.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLike}
          ></button>
          <h4 className="element__heart-count">{props.likesLenth}</h4>
        </div>
      </div>
    </li>
  );
}

export default Card;
