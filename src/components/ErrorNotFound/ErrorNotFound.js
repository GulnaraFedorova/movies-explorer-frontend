import React from 'react';
import { useNavigate } from 'react-router-dom'

import './ErrorNotFound.css';

function ErrorNotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__paragraph">Страница не найдена</p>
      <button className="not-found__link" onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
}

export default ErrorNotFound;