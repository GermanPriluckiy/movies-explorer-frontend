import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [keyword, setKeyword] = useState("");
  const [isLowDuration, setIsLowDuration] = useState(false);
  const [foundMovie, setFoundMovie] = useState([]);
  const [shownMovies, setShownMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isFirstSeartch, setIsFirstSeartch] = useState(false);

  useEffect(() => {
    isLowDuration
      ? setShownMovies(savedMovies.filter((item) => item.duration <= 40))
      : setShownMovies(savedMovies);
    setIsFirstSeartch(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies]);

  function handleInputChange(e) {
    setKeyword(e.target.value);
  }

  function handleCheckbox(e) {
    if (isFirstSeartch === true) {
      if (isLowDuration) {
        setIsLowDuration(false);
        setShownMovies(foundMovie);
        if (foundMovie.length === 0) {
          setIsNotFound(true);
        } else {
          setIsNotFound(false);
        }
      } else {
        setIsLowDuration(true);
        const lowDurationMovies = foundMovie.filter(
          (item) => item.duration <= 40
        );
        if (lowDurationMovies.length === 0) {
          setIsNotFound(true);
        } else {
          setIsNotFound(false);
        }
        setShownMovies(lowDurationMovies);
      }
    } else {
      if (isLowDuration) {
        setIsLowDuration(false);
        setShownMovies(savedMovies);

        setIsNotFound(false);
      } else {
        setIsLowDuration(true);
        const lowDurationMovies = savedMovies.filter(
          (item) => item.duration <= 40
        );

        setShownMovies(lowDurationMovies);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword) {
      alert("Введите ключевое слово");
      return;
    }
    setIsNotFound(false);
    setIsFirstSeartch(true);
    const movies = savedMovies.filter(
      (movie) =>
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
    );

    if (movies.length === 0) {
      setIsNotFound(true);
    }

    setFoundMovie(movies);

    if (isLowDuration) {
      const result = movies.filter((item) => item.duration <= 40);

      if (result.length === 0) {
        setIsNotFound(true);
      }

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
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}

export default SavedMovies;
