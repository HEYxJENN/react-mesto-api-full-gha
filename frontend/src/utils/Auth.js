import React from "react";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this._address = props.baseUrl;
    this._headers = props.headers;
  }

  _getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  register(password, email) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._getRes);
  }

  login(password, email) {
    console.log(email);
    console.log(password);
    console.log(this._address);
    return fetch(`${this._address}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._getRes);
  }

  checkToken(jwt) {
    console.log(jwt);
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
        // `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzcyNjE1NGQ0NTY3YzAwMTMxZTMyNTgiLCJpYXQiOjE2Njg0NDE3MjJ9.CP33r0bR6kpY2WHnYJBc4tfzsmYi2ANoscrGo1aNhO4`,
      },
    }).then(this._getRes);
  }
}

const AuthX = new Auth({
  // baseUrl: "http://localhost:3001",
  baseUrl: "http://ohheyfront.nomoredomains.work/api",
  headers: { "Content-Type": "application/json" },

  // headers: {
  //   authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFiMTY4NzU5OTc3Y2YzOTFkMDJkMTQiLCJpYXQiOjE2Nzk1MDQ5ODcsImV4cCI6MTY4MDEwOTc4N30.AonqOulc0aO3Otl-oURRl8l4OCgwW1gLfkLaMXR9QeE",
  //   "Content-Type": "application/json",
  // },
});

export default AuthX;
