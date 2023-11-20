import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './ErrorNotFound.css';

function ErrorNotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__paragraph">Страница не найдена</p>
      <Link className="not-found__link" onClick={handleClick}>Назад</Link>
    </section>
  );
}

export default ErrorNotFound;