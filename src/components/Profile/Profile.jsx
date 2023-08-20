import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState } from "react";
import { api } from "../../utils/MainApi";
import { EMAIL_REGEXP } from "../../utils/constants";

function Profile({ onLogout }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [formValues, setFormValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNewInfo, setIsNewInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [editMessage, setEditMessage] = useState("");
  const [isSuccessEditProfile, setIsSuccessEditProfile] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState("");

  function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
  }

  React.useEffect(() => {
    setFormValues(currentUser);
    console.log("test");
  }, [currentUser]);

  React.useEffect(() => {
    setIsNewInfo(
      currentUser.name !== formValues.name ||
        currentUser.email !== formValues.email
    );
  }, [currentUser.email, currentUser.name, formValues]);

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
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

  const { name, email } = formValues;
  const isEditProfile = isFormValid && isNewInfo;

  function handleSubmit(e) {
    e.preventDefault();

    api
      .setUserInfo(name, email)
      .then((res) => {
        console.log(res);
        setIsSuccessEditProfile(true);
        setEditMessage("Данные профиля успешно изменены.");
      })
      .catch((err) => {
        setIsSuccessEditProfile(false);
        if (err.includes("409")) {
          setEditMessage("Пользователь с такой почтой уже существует");
        }
      });
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" method="post" onSubmit={handleSubmit}>
          <div className="profile__form-container">
            <span className="profile__label">Имя</span>
            <input
              lang="ru"
              placeholder="Имя"
              className="profile__input"
              name="name"
              required
              minLength="3"
              maxLength="40"
              value={name || ""}
              onChange={handleInputChange}
            />
            <span className="profile__error">{errorMessage.name}</span>
            <span className="profile__label">E-mail</span>
            <input
              type="email"
              lang="ru"
              placeholder={currentUser.email}
              className="profile__input"
              name="email"
              required
              maxLength="40"
              value={email || ""}
              onChange={handleInputChange}
            />
            <span className="profile__error">
              {emailValidationMessage || errorMessage.email}
            </span>
          </div>
          <p
            className="profile__result"
            style={{ color: isSuccessEditProfile ? "green" : "red" }}
          >
            {editMessage}
          </p>
          <button
            className="profile__button"
            type="submit"
            disabled={!isEditProfile}
          >
            Редактировать
          </button>
        </form>

        <Link className="profile__subtitle-link" to="/" onClick={onLogout}>
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
