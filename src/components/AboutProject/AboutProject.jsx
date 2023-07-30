import React from "react";

function AboutProject() {
    return (
      <section className="about" id="about">   
        <h2 className="about__title">О проекте</h2>
        <div className="about__description">
            <p className="about__description-subtitle">Дипломный проект включал 5 этапов</p>
            <p className="about__description-subtitle">На выполнение диплома ушло 5 недель</p>
            <p className="about__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p className="about__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about__duration">
            <p className="about__duration-subtitle">1 неделя</p>
            <p className="about__duration-subtitle">4 недели</p>
            <p className="about__duration-text">Back-end</p>
            <p className="about__duration-text">Front-end</p>
        </div>
      </section>
    );
  }
  
  export default AboutProject;