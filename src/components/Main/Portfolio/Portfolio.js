import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio" aria-label="Информация о портфолио">
      <h2 className="portfolio__subtitle">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/GulnaraFedorova/how-to-learn"
          >
            <p className="portfolio__paragraph">Статичный сайт</p>
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://gulnarafedorova.github.io/russian-travel/"
          >
            <p className="portfolio__paragraph">Адаптивный сайт</p>
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://mesto.melograno.nomoredomainsrocks.ru/"
          >
            <p className="portfolio__paragraph">Одностраничное приложение</p>
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;