import React from 'react';
import './AboutProject.css';

function AboutProject( ) {
  return (
    <section className="about-project" id="about-project" aria-label="Информация о проекте">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__list">
        <li>
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li>
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="about-project__timeline">
        <li className="about-project__backend-timeline">1 неделя</li>
        <li className="about-project__frontend-timeline">4 недели</li>
        <li className="about-project__backend-subtitle">Back-end</li>
        <li className="about-project__frontend-subtitle">Front-end</li>
      </ul>
    </section>
  );
}

export default AboutProject;