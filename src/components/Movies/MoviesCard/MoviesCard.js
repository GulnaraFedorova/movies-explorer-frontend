import React, {useContext} from 'react';
import './MoviesCard.css';

import {MOVIES_API_URL} from '../../../utils/constants';
import { MoviesContext } from '../../../contexts/MoviesContext';

function MoviesCard({ card, onLike, onDislike, buttonType }) {
  const { id, nameRU, nameEN, duration, image, trailerLink } = card;
  const { savedMovies } = useContext(MoviesContext);

  const convertedDuration = () => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  const savedMovie = savedMovies.find(
    (savedMovie) => savedMovie.movieId === id
  );
  const isLiked = (() => (savedMovie ? true : false))();

  const handleLikeMovie = () =>
    isLiked ? onDislike(savedMovie) : onLike(card);

  const handleDislikeMovie = () => onDislike(card);

  const favoriteMovieButtonClass = `movies-card__like ${isLiked ? 'movies-card__like_active' : ''}`;
  const removeFavoriteMovieButtonClass = 'movies-card__delete';

  let cardButton;
  if (buttonType === "dislike") {
    cardButton = (
      <button className={removeFavoriteMovieButtonClass} onClick={handleDislikeMovie}></button>
    );
  } else if (buttonType === "like") {
    cardButton = (
      <button className={favoriteMovieButtonClass} onClick={handleLikeMovie}></button>
    );
  }

  return (
    <div className="movies-card">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={image.url ? MOVIES_API_URL + image.url : image} className="movies-card__img" alt={`Изображение фильма ${card.nameRU || card.nameEN}`} />
      </a>  
      <div className="movies-card__container">
        <h3 className="movies-card__title">{nameRU || nameEN}</h3>
        {cardButton}
        <p className="movies-card__duration">{convertedDuration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;