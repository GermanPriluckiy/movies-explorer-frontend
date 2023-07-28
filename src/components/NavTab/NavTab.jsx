import React from "react";

function NavTab() {
    return (
      <nav className="navtab">
        <ul className="navtab__menu">
            <li className="navtab__item"><a className="navtab__link" href="https">О проекте</a></li>
            <li className="navtab__item"><a className="navtab__link" href="https">Технологии</a></li>
            <li className="navtab__item"><a className="navtab__link" href="https">Студент</a></li>
        </ul>
      </nav>
    );
  }
  
  export default NavTab;