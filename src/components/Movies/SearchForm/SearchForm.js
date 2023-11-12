import React from "react";
import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search__container">
        <input 
          id="search"
          className="search__input"
          placeholder="Фильм"
          name="search"
          autoComplete="off"
          type="text"
          required
        />
        <button type="submit" className="search__button"></button>
      </div>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;