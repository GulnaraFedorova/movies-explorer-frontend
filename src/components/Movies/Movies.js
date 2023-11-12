import React from 'react';
import './Movies.css';

import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ initialMovies }) {
  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList movies={ initialMovies } />
      <button className='movies__button'>Ещё</button>
    </section>
  );
}
    
export default Movies;