import React from 'react';
import './AboutMe.css';
import photo from '../../../images/Photo.jpeg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me" id="about-me" aria-label="О студенте">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__description">
        <h3 className="about-me__name">Гульнара</h3>
        <h4 className="about-me__job">Фронтенд-разработчик, 29 лет</h4>
        <p className="about-me__paragraph">Я родилась в Нефтекамске и закончила университет нефти и газа имени И.М. Губкина. Я люблю путешествовать. Недавно начала кодить. С 2015 года работаю в компании, которая занимается морскими исследованиями. После того, как пройду курс по веб-разработке, хочу начать заниматься фриланс-заказами и уйти с постоянной работы.</p>
        <a
          className="about-me__link"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/GulnaraFedorova"
        >
          Github
        </a>
        <img
          className="about-me__photo"
          src={photo}
          alt="Фото автора"
        />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
