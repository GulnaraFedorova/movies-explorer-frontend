import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  return location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' ? (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <ul className="footer__list">
          <li>
            <p className="footer__copyright">&copy; 2023</p>
          </li>
          <li className="footer__list-item">
            <a href="https://praktikum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a href="https://github.com/GulnaraFedorova" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
    </footer>
    )
    :
    (
    <>
    </>
    );
}
export default Footer;