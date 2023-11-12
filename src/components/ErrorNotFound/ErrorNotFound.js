import React from 'react';
import { Link } from 'react-router-dom'

import './ErrorNotFound.css';

function ErrorNotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__paragraph">Страница не найдена</p>
      <Link to="/" className="not-found__link">Назад</Link>
    </section>
  );
}

export default ErrorNotFound;