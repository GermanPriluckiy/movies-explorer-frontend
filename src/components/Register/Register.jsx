import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <img className="register__logo" src={logo} alt="Логотип" />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" method="post">
          <span className="register__label">Имя</span>
          <input
            lang="ru"
            placeholder="Имя"
            className="register__input"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="register__error"></span>
          <span className="register__label">E-mail</span>
          <input
            type="email"
            lang="ru"
            placeholder="Email"
            className="register__input"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="register__error"></span>
          <span className="register__label">Пароль</span>
          <input
            type="password"
            lang="ru"
            placeholder="Пароль"
            className="register__input"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="register__error"></span>
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>

        <p className="register__subtitle">
          Уже зарегистрированы?
          <Link className="register__subtitle-link" to="/signin">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
