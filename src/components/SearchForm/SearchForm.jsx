import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { apiMovies } from "../../utils/MoviesApi.js";

function SearchForm({ movies, setMovies, setIsLoading, setIsNotFound }) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));
    localStorage.getItem("isLowDuration") === "true"
      ? setIsLowDuration(true)
      : setIsLowDuration(false);
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

    setIsLoading(true);
    setIsNotFound(false);

    apiMovies
      .getMovies()
      .then((res) => {
        const movies = res.filter(
          (movie) =>
            movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
            movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
        );

        if (movies.length === 0) {
          setIsNotFound(true);
        }

        if (isLowDuration) {
          const result = movies.filter((item) => item.duration <= 40);
          localStorage.setItem("movies", JSON.stringify(result));
          localStorage.setItem("isLowDuration", isLowDuration);
          setMovies(result);
        } else {
          localStorage.setItem("movies", JSON.stringify(movies));
          localStorage.setItem("isLowDuration", isLowDuration);
          setMovies(movies);
        }

        localStorage.setItem("keyword", keyword);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCheckbox() {
    if (isLowDuration) {
      setIsLowDuration(false);
    } else {
      setIsLowDuration(true);
      const lowDurationMovies = movies.filter((item) => item.duration <= 40);
      setMovies(lowDurationMovies);
    }
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
        <FilterCheckbox
          onChange={handleCheckbox}
          isLowDuration={isLowDuration}
          setIsLowDuration={setIsLowDuration}
        />
      </div>
    </div>
  );
}

export default SearchForm;
