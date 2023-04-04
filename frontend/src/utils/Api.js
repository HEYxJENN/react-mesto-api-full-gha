import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this._address = props.baseUrl;
    this._headers = props.headers;
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this._headers.authorization = `Bearer ${jwt.replace(/["]/g, "")}`;
    }
  }

  _getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._getRes);
  }

  setUser({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getRes);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    })
      .then(console.log(this._headers))
      .then(this._getRes);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getRes);
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getRes);
  }

  changeLikeStatus(cardID, liked) {
    return fetch(`${this._address}/cards/${cardID}/likes`, {
      method: liked ? "PUT" : "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._getRes);
  }

  removeCard(cardID) {
    return fetch(`${this._address}/cards/${cardID}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._getRes);
  }
}

const ApiX = new Api({
  baseUrl: "http://ohheyfront.nomoredomains.work/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiX;
