import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="navigation">
            <Link className="navigation__link" to="/movies">Фильмы</Link>
            <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
            <Link className="navigation__link" to="/profile">Аккаунт</Link>
        </nav>
    );
}

export default Navigation;