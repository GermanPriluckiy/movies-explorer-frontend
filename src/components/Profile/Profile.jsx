import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form" method="post">
          <div className="profile__form-container">
            <span className="profile__label">Имя</span>
            <input
              lang="ru"
              placeholder="Виталий"
              className="profile__input"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="profile__error"></span>
            <span className="profile__label">E-mail</span>
            <input
              type="email"
              lang="ru"
              placeholder="pochta@yandex.ru"
              className="profile__input"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="profile__error"></span>
          </div>
          <button className="profile__button" type="submit">
            Редактировать
          </button>
        </form>

        <Link className="profile__subtitle-link" to="/">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
