import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info">
        <p className="footer__copyright">&#169; 2023</p>
        <nav className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/" rel="noreferrer" target="_blank">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/GermanPriluckiy" rel="noreferrer" target="_blank">Github</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
