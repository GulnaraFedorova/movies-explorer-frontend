import React from 'react';
import './MoviesCard.css';

import { useLocation } from "react-router-dom";

function MoviesCard({ data }) {
  const { name, image, duration, isLiked } = data;
  const { pathname } = useLocation();

  function handleButtonClick(e) {
    e.preventDefault();
    console.log('click');
  }

  return (
    <div className="movies-card">
     <img className="movies-card__img" src={image.url} alt={name} />
      <div className="movies-card__container">
        <h3 className="movies-card__title">{name}</h3>
        <button
        type="button"
        className={pathname === "/movies" ? `movies-card__like ${isLiked ? "movies-card__like_active" : ""}`:
        "movies-card__delete"}
        onClick={handleButtonClick}
        />
        <p className="movies-card__duration">{duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;