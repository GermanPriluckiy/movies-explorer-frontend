import React, { useState, useEffect } from "react";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { EMAIL_REGEXP } from "../../utils/constants";

function Login({ loggedIn }) {
  const [formValues, setFormValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  function handleEmailValidation(value) {
    return EMAIL_REGEXP.test(value);
  }

  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === "userEmail") {
      if (handleEmailValidation(value) === true) {
        setEmailValidationMessage("");
      } else {
        setEmailValidationMessage("Неверный адрес электронной почты");
      }
      setIsEmailValid(handleEmailValidation(value));
    }

    setFormValues({ ...formValues, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  const { userEmail, userPassword } = formValues;

  function handleSubmit(e) {
    e.preventDefault();

    setIsFormValid(false);

    login(userEmail, userPassword)
      .then((data) => {
        navigate("/movies");
      })
      .catch((err) => {
        if (err.includes("401")) {
          setLoginMessage("Неверная почта или пароль.");
        }
      });
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies");
    }
  }, [loggedIn, navigate]);

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип Сайта" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" method="post" onSubmit={handleSubmit}>
          <span className="login__label">E-mail</span>
          <input
            type="email"
            lang="ru"
            placeholder="Email"
            name="userEmail"
            className={
              errorMessage.userEmail || emailValidationMessage
                ? "login__input login__input_error"
                : "login__input"
            }
            required
            minLength="2"
            maxLength="40"
            value={userEmail || ""}
            onChange={handleInputChange}
          />
          <span className="login__error">
            {emailValidationMessage || errorMessage.userEmail}
          </span>
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
          <span className="login__result">{loginMessage}</span>
          <button
            className="login__button"
            type="submit"
            disabled={!(isFormValid && isEmailValid)}
          >
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
