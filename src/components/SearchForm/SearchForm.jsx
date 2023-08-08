import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form">
          <input
            type="search"
            lang="ru"
            placeholder="Фильм"
            className="search__input"
            minLength="2"
            maxLength="200"
          />
          <button className="search__button" type="submit">
            Найти
          </button>
        </form>
        <FilterCheckbox />
      </div>
    </div>
  );
}

export default SearchForm;
