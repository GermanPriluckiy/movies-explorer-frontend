import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, setSavedMovies }) {
  const [keyword, setKeyword] = useState("");
  const [isLowDuration, setIsLowDuration] = useState(false);
  const [shownMovies, setShownMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    setShownMovies(savedMovies);
  }, [savedMovies]);

  function handleInputChange(e) {
    setKeyword(e.target.value);
    
  }

  function handleCheckbox(e) {
    if (isLowDuration) {
      setIsLowDuration(false);
      setShownMovies(savedMovies);
    } else {
      setIsLowDuration(true);
      const lowDurationMovies = savedMovies.filter(
        (item) => item.duration <= 40
      );
      setShownMovies(lowDurationMovies);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword) {
      alert("Введите ключевое слово");
      return;
    }
    setIsNotFound(false);

    const movies = savedMovies.filter(
      (movie) =>
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
    );

    if (movies.length === 0) {
      setIsNotFound(true);
    }

    if (isLowDuration) {
      const result = savedMovies.filter((item) => item.duration <= 40);

      setShownMovies(result);
    } else {
      setShownMovies(movies);
    }
  }

  return (
    <main className="saved-movies">
      <SearchForm
        onChange={handleInputChange}
        keyword={keyword}
        handleCheckbox={handleCheckbox}
        onSubmit={handleSubmit}
        isLowDuration={isLowDuration}
      />
      <MoviesCardList
        movies={shownMovies}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
      />
    </main>
  );
}

export default SavedMovies;
