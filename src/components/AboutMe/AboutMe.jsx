import React from "react";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__description">
          <h2 className="about-me__description-name">Виталий</h2>
          <p className="about-me__description-prof">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__description-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__description-link"
            href="https://github.com/GermanPriluckiy"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__description-photo"
          src={photo}
          alt="Моя фотография"
        />
      </div>
    </section>
  );
}

export default AboutMe;
