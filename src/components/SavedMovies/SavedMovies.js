import React from 'react';
import './SavedMovies.css';

import { savedMovies } from "../../utils/constants";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";
import Movies from '../Movies/Movies';

function SavedMovies() {
  const cardElements = savedMovies.slice(0,12).map((item) => <li key={item.id}><MoviesCard data={item}/></li>);
  return (
    <main className="saved-movies">
      <Movies />
    </main>
  );
}

export default SavedMovies;