import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import React from "react";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header" style={ { backgroundColor: window.location.pathname === "/" ? "#465DFF" : "#FFF" } }>
      <a href="#about">
      <img className="header__logo" src={logo} alt="Лого Сайта" />
      </a>
      {window.location.pathname === "/" ? (
        <div className="header__menu">
          <Link className="header__registation" to="/signup">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="header__login">Войти</button>
          </Link>
        </div>
      ) : (
        <Navigation />
      )}
    </header>
  );
}

export default Header;
