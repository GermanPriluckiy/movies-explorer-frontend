import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        className={({ isActive }) =>
          isActive ? "navigation__link_active" : "navigation__link"
        }
        to="/movies"
      >
        Фильмы
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navigation__link_active" : "navigation__link"
        }
        to="/saved-movies"
      >
        Сохранённые фильмы
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "navigation__link_active" : "navigation__link"
        }
        to="/profile"
      >
        Аккаунт
      </NavLink>
    </nav>
  );
}

export default Navigation;
