import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  onSubmit,
  onChange,
  keyword,
  handleCheckbox,
  isLowDuration,
}) {
  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={onSubmit}>
          <input
            type="search"
            lang="ru"
            placeholder="Введите ключевое слово"
            className="search__input"
            minLength="2"
            maxLength="200"
            value={keyword || ""}
            onChange={onChange}
          />
          <button className="search__button" type="submit">
            Найти
          </button>
        </form>
        <FilterCheckbox
          onChange={handleCheckbox}
          isLowDuration={isLowDuration}
        />
      </div>
    </div>
  );
}

export default SearchForm;
