import React from "react";
import linkIcon from "../../images/link-icon.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__links">
        <a
          className="portfolio__cover"
          href="https://github.com/GermanPriluckiy/how-to-learn"
        >
          <p className="portfolio__link">Статичный сайт</p>
          <img
            className="portfolio__icon"
            src={linkIcon}
            alt="Ссылка на проект Статичный сайт"
          />
        </a>
        <a
          className="portfolio__cover"
          href="https://github.com/GermanPriluckiy/russian-travel"
        >
          <p className="portfolio__link">Адаптивный сайт</p>
          <img
            className="portfolio__icon"
            src={linkIcon}
            alt="Ссылка на проект Адаптивный сайт"
          />
        </a>
        <a
          className="portfolio__cover"
          href="https://github.com/GermanPriluckiy/mesto"
        >
          <p className="portfolio__link">Одностраничное приложение</p>
          <img
            className="portfolio__icon"
            src={linkIcon}
            alt="Ссылка на проект Одностраничное приложение"
          />
        </a>
      </div>
    </div>
  );
}

export default Portfolio;
