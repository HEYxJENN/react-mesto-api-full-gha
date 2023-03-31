import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    props.onSubmit({ password, email });
  };

  const handleMail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="content">
      <Header func={""} sign={"войти"} email={""} link={"/auth"} />
      <div className="registration" id="registration">
        <h2 className="registration__header">Регистрация</h2>
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

            <button className="registration__confirm">
              Зарегистрироваться
            </button>

            <h3 className="registration__already">
              {" "}
              Уже зарегистрированы?
              <Link to="/auth">Войти</Link>{" "}
            </h3>
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default Register;
