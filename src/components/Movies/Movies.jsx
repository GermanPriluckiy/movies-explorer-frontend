import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { apiMovies } from "../../utils/MoviesApi.js";
import { DEFAULT_NUMBER_OF_MOVIES } from "../../utils/constants";

function Movies({ savedMovies, handleButtonClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLowDuration, setIsLowDuration] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [countMovie, setCountMovie] = useState(2);

  useEffect(() => {
    !localStorage.getItem("movies")
      ? apiMovies
          .getMovies()
          .then((res) => {
            setAllMovies(res);
            setMovies(res.slice(0, DEFAULT_NUMBER_OF_MOVIES));
          })
          .catch((err) => {
            console.log(err);
          })
      : localStorage.getItem("isLowDuration") === "true"
      ? setMovies(
          JSON.parse(localStorage.getItem("movies")).filter(
            (item) => item.duration <= 40
          )
        )
      : setMovies(JSON.parse(localStorage.getItem("movies")));
  }, []);

  function showMoreMovies() {
    setMovies(allMovies.slice(0, DEFAULT_NUMBER_OF_MOVIES + countMovie));
    setCountMovie(countMovie + 2);
  }

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));

    localStorage.getItem("isLowDuration") === "true"
      ? setIsLowDuration(true)
      : setIsLowDuration(false);
  }, []);

  function handleInputChange(e) {
    setKeyword(e.target.value);
    console.log(DEFAULT_NUMBER_OF_MOVIES);
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

        localStorage.setItem("movies", JSON.stringify(movies));

        if (movies.length === 0) {
          setIsNotFound(true);
        }

        if (isLowDuration) {
          const result = movies.filter((item) => item.duration <= 40);
          localStorage.setItem("isLowDuration", isLowDuration);
          setMovies(result);
        } else {
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

  function handleCheckbox(e) {
    if (isLowDuration) {
      setIsLowDuration(false);
      localStorage.getItem("movies")
        ? setMovies(JSON.parse(localStorage.getItem("movies")))
        : setMovies(allMovies.slice(0, DEFAULT_NUMBER_OF_MOVIES));
    } else {
      setIsLowDuration(true);
      const lowDurationMovies = localStorage.getItem("movies")
        ? movies.filter((item) => item.duration <= 40)
        : allMovies.filter((item) => item.duration <= 40);
      setMovies(lowDurationMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        onChange={handleInputChange}
        handleCheckbox={handleCheckbox}
        keyword={keyword}
        onSubmit={handleSubmit}
        isLowDuration={isLowDuration}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            movies={movies}
            isNotFound={isNotFound}
            savedMovies={savedMovies}
            handleButtonClick={handleButtonClick}
          />
          {movies.length >= DEFAULT_NUMBER_OF_MOVIES && countMovie <= movies.length ? (
            <button className="movies__more" onClick={showMoreMovies}>
              Ещё
            </button>
          ) : (
            ""
          )}
        </>
      )}
    </main>
  );
}

export default Movies;
