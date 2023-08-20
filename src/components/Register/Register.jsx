import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/Auth";
import { login } from "../../utils/Auth";
import { EMAIL_REGEXP } from "../../utils/constants";

function Register() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState("");

  function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "userEmail") {
      if (isEmailValid(value) === true) {
        setEmailValidationMessage("");
      } else {
        setIsFormValid(false);
        setEmailValidationMessage("Неверный адрес электронной почты");
      }
    }

    setFormValues({ ...formValues, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  const { userName, userEmail, userPassword } = formValues;

  function handleSubmit(e) {
    e.preventDefault();
    setIsFormValid(false);
    register(userName, userEmail, userPassword)
      .then((res) => {
        login(userEmail, userPassword)
          .then((res) => {
            navigate("/movies");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.includes("409")) {
          setRegistrationMessage("Пользователь с такой почтой уже существует.");
        }
      });
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          className="register__form"
          method="post"
          noValidate
          onSubmit={handleSubmit}
        >
          <span className="register__label">Имя</span>
          <input
            lang="ru"
            placeholder="Имя"
            className={
              errorMessage.userName
                ? "register__input register__input_error"
                : "register__input"
            }
            name="userName"
            required
            minLength="2"
            maxLength="40"
            value={userName || ""}
            onChange={handleInputChange}
          />
          <span className="register__error">{errorMessage.userName}</span>
          <span className="register__label">E-mail</span>
          <input
            type="email"
            lang="ru"
            placeholder="Email"
            className={
              errorMessage.userEmail || emailValidationMessage
                ? "register__input register__input_error"
                : "register__input"
            }
            name="userEmail"
            required
            minLength="2"
            maxLength="40"
            value={userEmail || ""}
            onChange={handleInputChange}
          />
          <span className="register__error">
            {emailValidationMessage || errorMessage.userEmail}
          </span>
          <span className="register__label">Пароль</span>
          <input
            type="password"
            lang="ru"
            placeholder="Пароль"
            className={
              errorMessage.userPassword
                ? "register__input register__input_error"
                : "register__input"
            }
            name="userPassword"
            required
            minLength="6"
            maxLength="20"
            value={userPassword || ""}
            onChange={handleInputChange}
          />
          <span className="register__error">{errorMessage.userPassword}</span>
          <span className="register__result">{registrationMessage}</span>
          <button
            className="register__button"
            type="submit"
            disabled={!isFormValid}
          >
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
