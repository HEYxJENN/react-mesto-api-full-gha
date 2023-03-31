import React from "react";
import headerLogo from "../images/logo_white.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="logo" />
      <h3 className="header__sign">
        {props.email}{" "}
        <Link className="header__sign" to={props.link} onClick={props.func}>
          {props.sign}
        </Link>{" "}
      </h3>
    </header>
  );
}

export default Header;

// если есть мэил то мэил и выйти функция хэндллогаут //если нет мэйла - как понять регистрация или  авторзация ероме пути страницы
