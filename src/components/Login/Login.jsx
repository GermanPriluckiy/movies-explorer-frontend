import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" method="post">
          <span className="login__label">E-mail</span>
          <input
            type="email"
            lang="ru"
            placeholder="Email"
            className="login__input"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="login__error"></span>
          <span className="login__label">Пароль</span>
          <input
            type="password"
            lang="ru"
            placeholder="Пароль"
            className="login__input"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="login__error"></span>
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>

        <p className="login__subtitle">
          Еще не зарегистрированы?
          <Link className="login__subtitle-link" to="/signup">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
