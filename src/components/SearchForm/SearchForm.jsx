import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { apiMovies } from "../../utils/MoviesApi.js";

function SearchForm() {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));
  }, []);

  const [isLowDuration, setIsLowDuration] = useState(false);

  function handleInputChange(e) {
    setKeyword(e.target.value);
    
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword) {
      alert("Введите ключевое слово");
      return;
    }
    apiMovies
      .getInitialCards()
      .then((res) => {
        const movies = res.find(
          (movie) =>
            movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
            movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
        );
        console.log(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
        localStorage.setItem('keyword', keyword);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckbox() {
    isLowDuration ? setIsLowDuration(false) : setIsLowDuration(true);
  }

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            type="search"
            lang="ru"
            placeholder="Введите ключевое слово"
            className="search__input"
            minLength="2"
            maxLength="200"
            value={keyword || ""}
            onChange={handleInputChange}
          />
          <button className="search__button" type="submit">
            Найти
          </button>
        </form>
        <FilterCheckbox onChange={handleCheckbox} />
      </div>
    </div>
  );
}

export default SearchForm;
