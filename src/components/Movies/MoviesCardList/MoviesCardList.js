import React from 'react';
import './MoviesCardList.css';

import { initialMovies } from "../../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList( ) {
  const cardElements = initialMovies.map((movie) => 
    <li key={movie.id}>
      <MoviesCard data={movie}/>
    </li>);
  
  return (
    <ul className="movies-card__list">
      {cardElements}
    </ul>
  );
}

export default MoviesCardList;