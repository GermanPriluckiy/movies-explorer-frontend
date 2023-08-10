import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login() {
  const [formValues, setFormValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  const { userEmail, userPassword } = formValues;

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img
            className="login__logo"
            src={logo}
            alt="Логотип Сайта"
          />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" method="post">
          <span className="login__label">E-mail</span>
          <input
            type="email"
            lang="ru"
            placeholder="Email"
            name="userEmail"
            className={
              errorMessage.userEmail
                ? "login__input login__input_error"
                : "login__input"
            }
            required
            minLength="2"
            maxLength="40"
            value={userEmail || ""}
            onChange={handleInputChange}
          />
          <span className="login__error">{errorMessage.userEmail}</span>
          <span className="login__label">Пароль</span>
          <input
            type="password"
            lang="ru"
            placeholder="Пароль"
            name="userPassword"
            className={
              errorMessage.userPassword
                ? "login__input login__input_error"
                : "login__input"
            }
            required
            minLength="6"
            maxLength="200"
            value={userPassword || ""}
            onChange={handleInputChange}
          />
          <span className="login__error">{errorMessage.userPassword}</span>
          <button className="login__button" type="submit" disabled={!isFormValid}>
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
