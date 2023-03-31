import React, { useState } from "react";
import Header from "./Header";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ password, email });
  };

  const handleMail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  function header() {
    console.log("loggedout");
  }

  return (
    <main className="content">
      <Header func={header} sign={"регистрация"} email={""} link={"/reg"} />
      <div className="registration" id="registration">
        <h2 className="registration__header">Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="registration__form">
            <label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className="registration__input "
                // id="entername"
                required
                minLength="2"
                maxLength="40"
                onChange={handleMail}
                value={email}
              />
              <span
                className="popup__forms-input-error entername-error"
                // id="entername-error"
              ></span>
            </label>
            <label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                className="registration__input"
                // id="enterabout"
                required
                minLength="2"
                maxLength="200"
                onChange={handlePass}
                value={password}
              />
              <span
                className="popup__forms-input-error about-error enterabout-error"
                // id="enterabout-error"
              ></span>
            </label>

            <button className="registration__confirm">Войти</button>

            {/* <h3 className="registration__already"> Регистрация </h3> */}
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default Login;
