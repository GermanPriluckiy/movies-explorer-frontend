import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import React from "react";
import Navigation from "../Navigation/Navigation";

function Header() {
  const location = useLocation();
  return (
    <header className="header" style={ { backgroundColor: location.pathname === "/" ? "#465DFF" : "#FFF" } }>
      <div className="header__container">
      <a href="#about">
      <img className="header__logo" src={logo} alt="Лого Сайта" />
      </a>
      {location.pathname === "/" ? (
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
      </div>
    </header>
  );
}

export default Header;
