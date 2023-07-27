import React from "react";

function NavTab() {
    return (
      <section className="navtab">
        <nav className="navtab__menu">
            <a className="navtab__link" href="#aboutProject">О проекте</a>
            <a className="navtab__link" href="https">Технологии</a>
            <a className="navtab__link" href="https">Студент</a>
        </nav>
      </section>
    );
  }
  
  export default NavTab;