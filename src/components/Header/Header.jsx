import { Link, Route, Routes } from "react-router-dom";
import logo from "../../images/logo.svg";
import React from "react";
import Navigation from "../Navigation/Navigation";
//import { Link, Route, Routes } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Сайта" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__menu">
              <Link className="header__registation" to="/signup">
                Регистрация
              </Link>
              <Link to="/signin">
                <button className="header__login">Войти</button>
              </Link>
            </div>
          }
        />
        <Route path="/movies" element={ <Navigation /> }/>
        <Route path="/profile" element={ <Navigation /> }/>
        <Route path="/saved-movies" element={ <Navigation /> }/>
      </Routes>
    </header>
  );
}

export default Header;
