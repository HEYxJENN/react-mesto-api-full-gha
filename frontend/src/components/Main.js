import React, { useState } from "react";
import Card from "./Cards.js";
import editImg from "../images/EditButton.svg";
import addImg from "../images/plus.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onLikeClick,
  onDelClick,
  header,
  email,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <Header func={header} sign={"выйти"} email={email} link={"/auth"} />

      <section className="profile">
        <div className="profile__image-cover">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt={`аватар пользователя ${currentUser.name}`}
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <img
            className="profile__edit"
            src={editImg}
            id="edit"
            alt="кнопка редактирования"
            onClick={onEditProfile}
          />
        </div>
        <p className="profile__caption">{currentUser.about} </p>
        <img
          className="profile__add"
          src={addImg}
          alt="кнопка добавления"
          onClick={onAddPlace}
        />
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => {
            return (
              <Card
                picture={card.link}
                _id={card._id}
                key={card._id}
                name={card.name}
                likes={card.likes}
                likesLenth={card.likes.length}
                onOpen={onCardClick}
                onLikeClick={onLikeClick}
                onDeleteClick={onDelClick}
                card={card}
                ownerId={card.owner._id}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
