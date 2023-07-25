import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import React from "react";
//import { Link, Route, Routes } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Сайта" />
      <div className="header__menu">
        <Link className="header__registation">Регистрация</Link>
        <button className="header__login">Войти</button>
      </div>
    </header>
  );
}

export default Header;
