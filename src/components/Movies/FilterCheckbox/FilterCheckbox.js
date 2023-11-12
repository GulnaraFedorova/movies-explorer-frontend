import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          id="filter-checkbox__input"
          type="checkbox"
          className="filter-checkbox__input"
        />
        <span className="filter-checkbox__aktive" />
      </label>
      <p className="filter-checkbox__paragraph">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;