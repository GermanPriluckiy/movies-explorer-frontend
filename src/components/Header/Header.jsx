import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import React from "react";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";

function Header() {
  const location = useLocation();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleBurgerMenu() {
    if (isBurgerMenuOpen) {
      setIsBurgerMenuOpen(false);
    } else {
      setIsBurgerMenuOpen(true);
    }
  }

  return (
    <header
      className="header"
      style={{
        backgroundColor: location.pathname === "/" ? "#465DFF" : "#FFF",
      }}
    >
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
          <>
            <Navigation isBurgerMenuOpen={isBurgerMenuOpen} />
            <nav className="header__burger-menu">
              <div
                className="header__burger-menu-btn"
                onClick={handleBurgerMenu}
              >
                {isBurgerMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <rect
                      x="7.16016"
                      y="9.28249"
                      width="3"
                      height="22"
                      transform="rotate(-45 7.16016 9.28249)"
                      fill="black"
                    />
                    <rect
                      x="22.7168"
                      y="7.16117"
                      width="3"
                      height="22"
                      transform="rotate(45 22.7168 7.16117)"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M36 14L8 14V11L36 11V14Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M36 24L8 24V21L36 21V24Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M36 34L8 34V31L36 31V34Z"
                      fill="black"
                    />
                  </svg>
                )}
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
