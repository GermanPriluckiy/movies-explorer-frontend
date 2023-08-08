import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navigation( { isBurgerMenuOpen } ) {
  return (
    <nav className={isBurgerMenuOpen ? "navigation navigation_active" : "navigation"}>
      <div className="navigation__links">
      <NavLink
        className={({ isActive }) =>
          isActive ? " navigation__link navigation__link_active" : "navigation__link"
        }
        to="/"
      >Главная</NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? " navigation__link navigation__link_active" : "navigation__link"
        }
        to="/movies"
      >
        Фильмы
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? " navigation__link navigation__link_active" : "navigation__link"
        }
        to="/saved-movies"
      >
        Сохранённые фильмы
      </NavLink>
      </div>
      <Link to="/profile">
        <button className="navigation__button"> Аккаунт</button>
      </Link>
    </nav>
  );
}

export default Navigation;
