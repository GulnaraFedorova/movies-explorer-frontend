import React from 'react';
import './Movies.css';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { MoviesContext } from "../../contexts/MoviesContext";
import { useState, useContext, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from './MoviesCard/MoviesCard';
import { useMediaQuery } from 'react-responsive';

function Movies({ onSearch, onLike, onDislike, isLoading }) {
  const sizeDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const sizeMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const sizeTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1279px)",});
  const [ cardsQuantity, setCardsQuantity ] = useState(5);

  const {
    filteredMovies,
    moviesKeyword,
    setMoviesKeyword,
    moviesIsShort,
    setMoviesIsShort,
    moviesIsSearched,
  } = useContext(MoviesContext);

  useEffect(() => {
    const initialQuantity = (() => {
      if (sizeDesktop) {
        return 12;
      }
      if (sizeTablet) {
        return 8;
      }
      if (sizeMobile) {
        return 5;
      }
    })();
    setCardsQuantity(initialQuantity);
  }, [filteredMovies, sizeDesktop, sizeTablet, sizeMobile]);

  const moviesCardElements = filteredMovies.map((card) => (
    <MoviesCard
      card={card}
      key={card.id}
      onLike={onLike}
      onDislike={onDislike}
      buttonType='like'
    />
  ));

  const shownCardElements = moviesCardElements.slice(0, cardsQuantity);

  function handleMoreClick()  {
    const increasedQuantity = (() => {
      if (sizeDesktop) {
        return 3;
      }
      if (sizeTablet) {
        return 2;
      }
      if (sizeMobile) {
        return 2;
      }
    })();
    setCardsQuantity(cardsQuantity + increasedQuantity);
  };

  const isIncreasedCardsActive = (() => {
    return shownCardElements.length === moviesCardElements.length ? false : true;
  })();

  const cardsMessage = (() => {
    if (!moviesIsSearched) {
      return <span></span>;
    } else if (!isLoading && moviesCardElements.length === 0) {
      return <span>Ничего не найдено</span>;
    }
  })();

  return (
      <section className="movies">
        <SearchForm
          onSubmit={onSearch}
          keyword={moviesKeyword}
          setKeyword={setMoviesKeyword}
          isShort={moviesIsShort}
          setIsShort={setMoviesIsShort}
        />
        {isLoading && <Preloader />}
        {cardsMessage} 
        <MoviesCardList
          moviesCardElements={shownCardElements} />
        {isIncreasedCardsActive && (
        <div className="movies__container">
          <button className="movies__button" type="button" onClick={handleMoreClick}>Ещё</button>
        </div>  
        )}
      </section>
  );
};

export default Movies;