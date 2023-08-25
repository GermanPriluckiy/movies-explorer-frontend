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
    if (localStorage.getItem("allMovies") !== null) {
      if (localStorage.getItem("foundMovies") === null) {
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
    }
  }, []);

  function handleSearchMovies(searchMovies) {
    const movies = searchMovies.filter(
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
  }

  function showMoreMovies() {
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

    setCountMovie(countMovie + 2);
  }

  // function showMoreMovies() {
  //   if (localStorage.getItem("foundMovies") === null) {
  //     isLowDuration
  //       ? setMovies(
  //           JSON.parse(localStorage.getItem("allMovies"))
  //             .filter((item) => item.duration <= 40)
  //             .slice(0, DEFAULT_NUMBER_OF_MOVIES + countMovie)
  //         )
  //       : setMovies(
  //           JSON.parse(localStorage.getItem("allMovies")).slice(
  //             0,
  //             DEFAULT_NUMBER_OF_MOVIES + countMovie
  //           )
  //         );
  //   } else {
  //     isLowDuration
  //       ? setMovies(
  //           JSON.parse(localStorage.getItem("foundMovies"))
  //             .filter((item) => item.duration <= 40)
  //             .slice(0, DEFAULT_NUMBER_OF_MOVIES + countMovie)
  //         )
  //       : setMovies(
  //           JSON.parse(localStorage.getItem("foundMovies")).slice(
  //             0,
  //             DEFAULT_NUMBER_OF_MOVIES + countMovie
  //           )
  //         );
  //   }

  //   setCountMovie(countMovie + 2);
  //   console.log(countMovie + DEFAULT_NUMBER_OF_MOVIES - 3, movies.length);
  // }

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));
    movies.length === 0 && localStorage.getItem("allMovies") !== null
      ? setIsNotFound(true)
      : setIsNotFound(false);

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
    setCountMovie(2);
    setIsLoading(true);
    setIsNotFound(false);
    if (localStorage.getItem("allMovies") === null) {
      apiMovies
        .getMovies()
        .then((res) => {
          localStorage.setItem("allMovies", JSON.stringify(res));
          handleSearchMovies(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleSearchMovies(JSON.parse(localStorage.getItem("allMovies")));
    }
    setIsLoading(false);
    localStorage.setItem("keyword", keyword);
  }

  function showFilteredMovies(moviesList) {
    setCountMovie(2);
    if (localStorage.getItem("allMovies") !== null) {
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
    } else {
      isLowDuration ? setIsLowDuration(false) : setIsLowDuration(true);
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
          {localStorage.getItem("allMovies") !== null &&
          movies.length <
            (isLowDuration
              ? JSON.parse(localStorage.getItem("foundMovies")).filter(
                  (item) => item.duration <= 40
                ).length
              : JSON.parse(localStorage.getItem("foundMovies")).length) ? (
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
