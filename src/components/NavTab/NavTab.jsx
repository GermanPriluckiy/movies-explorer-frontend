import React from "react";

function NavTab() {
    return (
      <nav className="navtab">
        <ul className="navtab__menu">
            <li className="navtab__item"><a className="navtab__link" href="#about">О проекте</a></li>
            <li className="navtab__item"><a className="navtab__link" href="#tech">Технологии</a></li>
            <li className="navtab__item"><a className="navtab__link" href="#student">Студент</a></li>
        </ul>
      </nav>
    );
  }
  
  export default NavTab;