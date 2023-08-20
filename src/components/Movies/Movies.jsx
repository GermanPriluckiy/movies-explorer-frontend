import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { apiMovies } from "../../utils/MoviesApi.js";
import { DEFAULT_NUMBER_OF_MOVIES } from "../../utils/constants";

function Movies({ savedMovies, handleButtonClick, onDeleteMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLowDuration, setIsLowDuration] = useState(false);
  const [movies, setMovies] = useState([]);
  const [countMovie, setCountMovie] = useState(2);

  useEffect(() => {
    if (localStorage.getItem("allMovies") === null) {
      apiMovies
        .getMovies()
        .then((res) => {
          localStorage.setItem("allMovies", JSON.stringify(res));
          setMovies(res.slice(0, DEFAULT_NUMBER_OF_MOVIES));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (localStorage.getItem("foundMovies") === null) {
      localStorage.getItem("isLowDuration") === "true"
        ? setMovies(
            JSON.parse(localStorage.getItem("allMovies")).filter(
              (item) => item.duration <= 40
            )
          )
        : setMovies(
            JSON.parse(localStorage.getItem("allMovies")).slice(
              0,
              DEFAULT_NUMBER_OF_MOVIES
            )
          );
    } else {
      localStorage.getItem("isLowDuration") === "true"
        ? setMovies(
            JSON.parse(localStorage.getItem("foundMovies")).filter(
              (item) => item.duration <= 40
            )
          )
        : setMovies(
            JSON.parse(localStorage.getItem("foundMovies")).slice(
              0,
              DEFAULT_NUMBER_OF_MOVIES
            )
          );
    }
  }, []);

  function showMoreMovies() {
    if (localStorage.getItem("foundMovies") === null) {
      isLowDuration
        ? setMovies(
            JSON.parse(localStorage.getItem("allMovies"))
              .filter((item) => item.duration <= 40)
              .slice(0, DEFAULT_NUMBER_OF_MOVIES + countMovie)
          )
        : setMovies(
            JSON.parse(localStorage.getItem("allMovies")).slice(
              0,
              DEFAULT_NUMBER_OF_MOVIES + countMovie
            )
          );
    } else {
      isLowDuration
        ? setMovies(
            JSON.parse(localStorage.getItem("foundMovies"))
              .filter((item) => item.duration <= 40)
              .slice(0, DEFAULT_NUMBER_OF_MOVIES + countMovie)
          )
        : setMovies(
            JSON.parse(localStorage.getItem("foundMovies")).slice(
              0,
              DEFAULT_NUMBER_OF_MOVIES + countMovie
            )
          );
    }

    setCountMovie(countMovie + 2);
  }

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));
    movies.length === 0 ? setIsNotFound(true) : setIsNotFound(false);

    localStorage.getItem("isLowDuration") === "true"
      ? setIsLowDuration(true)
      : setIsLowDuration(false);
  }, [movies]);

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

        localStorage.setItem("foundMovies", JSON.stringify(movies));

        if (movies.length === 0) {
          setIsNotFound(true);
        }

        if (isLowDuration) {
          const result = movies.filter((item) => item.duration <= 40);

          if (result.length === 0) {
            setIsNotFound(true);
          }

          setMovies(result);
        } else {
          setMovies(movies.slice(0, DEFAULT_NUMBER_OF_MOVIES));
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

  function showFilteredMovies(moviesList) {
    if (isLowDuration) {
      setIsNotFound(false);
      setIsLowDuration(false);
      localStorage.setItem("isLowDuration", false);
      setMovies(moviesList.slice(0, DEFAULT_NUMBER_OF_MOVIES));
    } else {
      setIsLowDuration(true);
      localStorage.setItem("isLowDuration", true);
      const lowDurationMovies = moviesList.filter(
        (item) => item.duration <= 40
      );
      if (lowDurationMovies.length === 0) {
        setIsNotFound(true);
      }
      setMovies(lowDurationMovies.slice(0, DEFAULT_NUMBER_OF_MOVIES));
    }
  }

  function handleCheckbox(e) {
    setCountMovie(2);
    localStorage.getItem("foundMovies") === null
      ? showFilteredMovies(JSON.parse(localStorage.getItem("allMovies")))
      : showFilteredMovies(JSON.parse(localStorage.getItem("foundMovies")));
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
            onDeleteMovie={onDeleteMovie}
          />
          {movies.length >= DEFAULT_NUMBER_OF_MOVIES &&
          countMovie + DEFAULT_NUMBER_OF_MOVIES - 3 < movies.length ? (
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
