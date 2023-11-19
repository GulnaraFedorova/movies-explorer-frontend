import React, { useState } from "react";
import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSubmit, keyword, setKeyword, isShort, setIsShort }) {
  const [missingKeywordErrMessage, setMissingKeywordErrMessage] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    if (keyword) {
      setMissingKeywordErrMessage(false);
      onSubmit();
    } else {
      setMissingKeywordErrMessage(true);
    }
  };

  return (
    <form name="search" className=" search-form" noValidate onSubmit={handleSearch}>
      <div className="search-form__container">
        <input 
          className="search-form__input" 
          name="search"
          placeholder="Фильм"
          type="text"
          autoComplete="off"
          value={keyword || ""}
          onChange={(event) => setKeyword(event.target.value)}
          required
        />
        {missingKeywordErrMessage && (
          <span className='search__input-error'>
            Необходимо ввести ключевое слово
          </span>
      )}
        <button type="submit" className="search-form__button"></button>
      </div>
      <FilterCheckbox isShort={isShort} setIsShort={setIsShort}>Короткометражки</FilterCheckbox>
    </form>
  );
}

export default SearchForm;